package io.vepo.jap.infra;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static java.util.stream.Collectors.toList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class QueryOptions {

    public enum Order {
        ASC, DESC
    };

    public static class QueryOptionsBuilder {
        private int offset;
        private int limit;
        private String sortField;
        private Order sortOrder;
        private Map<String, Object> fields;

        private QueryOptionsBuilder() {
            offset = 0;
            limit = -1;
            fields = new HashMap<>();
        }

        public QueryOptionsBuilder offset(int offset) {
            this.offset = offset;
            return this;
        }

        public QueryOptionsBuilder limit(int limit) {
            this.limit = limit;
            return this;
        }

        public QueryOptionsBuilder sortField(String sortField) {
            this.sortField = sortField;
            return this;
        }

        public QueryOptionsBuilder sortOrder(Order sortOrder) {
            this.sortOrder = sortOrder;
            return this;
        }

        public QueryOptionsBuilder field(String key, Object value) {
            if (nonNull(value)) {
                fields.put(key, value);
            }
            return this;
        }

        public QueryOptions build() {
            return new QueryOptions(this);
        }
    }

    public static QueryOptionsBuilder builder() {
        return new QueryOptionsBuilder();
    }

    private final int offset;
    private final int limit;
    private final Map<String, Object> fields;
    private final String sortField;
    private final Order sortOrder;

    private QueryOptions(QueryOptionsBuilder builder) {
        offset = builder.offset;
        limit = builder.limit;
        fields = builder.fields;
        sortField = builder.sortField;
        sortOrder = builder.sortOrder;
    }

    public <J, T> void fields(CriteriaBuilder criteriaBuilder, CriteriaQuery<J> query, Root<T> root) {
        List<Predicate> whereClauses = fields.entrySet()
                .stream()
                .map(entry -> {
                    if (entry.getValue() instanceof String) {
                        return criteriaBuilder.equal(root.get(entry.getKey()), "%" + entry.getValue() + "%");
                    } else {
                        return criteriaBuilder.equal(root.get(entry.getKey()), entry.getValue());
                    }
                }).collect(toList());
        if (!whereClauses.isEmpty()) {
            query.where(criteriaBuilder.and(whereClauses.toArray(new Predicate[whereClauses.size()])));
        }
    }

    public <T> TypedQuery<T> apply(TypedQuery<T> query) {
        if (limit >= 0) {
            query.setMaxResults(limit);
        }
        if (offset > 0) {
            query.setFirstResult(offset);
        }
        return query;
    }

    public void order(Consumer<String> ascCallback, Consumer<String> descCallback) {
        if (nonNull(sortField)) {
            if (isNull(sortOrder) || sortOrder == Order.ASC) {
                ascCallback.accept(sortField);
            } else {
                descCallback.accept(sortField);
            }
        }
    }

}
