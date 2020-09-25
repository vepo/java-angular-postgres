package io.vepo.jap.infra;

import java.util.List;

public class PaginatedResponse<T> {

    public static class PaginatedResponseBuilder<J> {

        private int total;
        private int offset;
        private List<J> items;

        private PaginatedResponseBuilder() {
        }

        public PaginatedResponseBuilder<J> total(int total) {
            this.total = total;
            return this;
        }

        public PaginatedResponseBuilder<J> offset(int offset) {
            this.offset = offset;
            return this;
        }

        public PaginatedResponseBuilder<J> items(List<J> items) {
            this.items = items;
            return this;
        }

        public PaginatedResponse<J> build() {
            return new PaginatedResponse<>(this);
        }
    }

    public static <J> PaginatedResponseBuilder<J> builder() {
        return new PaginatedResponseBuilder<>();
    }

    private int total;
    private int offset;
    private List<T> items;

    public PaginatedResponse() {
    }

    public PaginatedResponse(PaginatedResponseBuilder<T> builder) {
        this.total = builder.total;
        this.offset = builder.offset;
        this.items = builder.items;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public List<T> getItems() {
        return items;
    }

    public void setItems(List<T> items) {
        this.items = items;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((items == null) ? 0 : items.hashCode());
        result = prime * result + offset;
        result = prime * result + total;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        PaginatedResponse<?> other = (PaginatedResponse<?>) obj;
        if (items == null) {
            if (other.items != null) {
                return false;
            }
        } else if (!items.equals(other.items)) {
            return false;
        }
        if (offset != other.offset) {
            return false;
        }
        if (total != other.total) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "PaginatedResponse [total=" + total + ", offset=" + offset + ", items=" + items + "]";
    }
}
