package io.vepo.jap.user;

import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.vepo.jap.infra.QueryOptions;

@ApplicationScoped
@Transactional
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    @PersistenceContext
    private EntityManager em;

    public User create(User user) {
        logger.info("Creating user={}", user);
        em.persist(user);
        return user;
    }

    public Optional<User> findByUsername(String username) {
        try {
            return Optional.of(em
                    .createNamedQuery("User.findByUsername", User.class)
                    .setParameter("username", username)
                    .getSingleResult());
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    public void update(Integer userId, Consumer<User> updateFunction) {
        updateFunction.accept(em.find(User.class, userId));
    }

    public Optional<User> findByUsernameAndHashedPassword(String username, String hashedPassword) {
        try {
            return Optional.of(em
                    .createNamedQuery("User.findByUsernameAndHashedPassword", User.class)
                    .setParameter("username", username)
                    .setParameter("hashedPassword", hashedPassword)
                    .getSingleResult());
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    public List<User> findAll(QueryOptions options) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<User> query = criteriaBuilder.createQuery(User.class);
        Root<User> root = query.from(User.class);

        options.fields(criteriaBuilder, query, root);

        options.order(field -> query.orderBy(criteriaBuilder.asc(root.get(field))),
                field -> query.orderBy(criteriaBuilder.desc(root.get(field))));

        return options.apply(em.createQuery(query)).getResultList();
    }

    public int count(QueryOptions options) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = criteriaBuilder.createQuery(Long.class);

        Root<User> root = query.from(User.class);
        query.select(criteriaBuilder.count(root));

        options.fields(criteriaBuilder, query, root);
        return em.createQuery(query).getSingleResult().intValue();
    }

    public Optional<User> findById(int userId) {
        return Optional.ofNullable(em.find(User.class, userId));
    }

    public Optional<User> updateUser(int userId, Consumer<User> updateFn) {
        return Optional.ofNullable(em.find(User.class, userId)).map(user -> {
            updateFn.accept(user);
            return user;
        });
    }

}
