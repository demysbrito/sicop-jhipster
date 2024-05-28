package br.gov.pa.semas.sicop.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 * A Ajuda.
 */
@Entity
@Table(name = "ajudas")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Ajuda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @JdbcTypeCode(SqlTypes.VARCHAR)
    @Column(name = "id", length = 36)
    private UUID id;

    @NotNull
    @Size(max = 1000)
    @Column(name = "titulo", length = 1000, nullable = false)
    private String titulo;

    @Lob
    @Column(name = "conteudo")
    private String conteudo;

    @Column(name = "ativo")
    private Boolean ativo;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @Column(name = "deleted_at")
    private ZonedDateTime deletedAt;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "ajudas")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "ajudas", "assuntos" }, allowSetters = true)
    private Set<Topico> topicos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public UUID getId() {
        return this.id;
    }

    public Ajuda id(UUID id) {
        this.setId(id);
        return this;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitulo() {
        return this.titulo;
    }

    public Ajuda titulo(String titulo) {
        this.setTitulo(titulo);
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getConteudo() {
        return this.conteudo;
    }

    public Ajuda conteudo(String conteudo) {
        this.setConteudo(conteudo);
        return this;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public Boolean getAtivo() {
        return this.ativo;
    }

    public Ajuda ativo(Boolean ativo) {
        this.setAtivo(ativo);
        return this;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public ZonedDateTime getCreatedAt() {
        return this.createdAt;
    }

    public Ajuda createdAt(ZonedDateTime createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public Ajuda updatedAt(ZonedDateTime updatedAt) {
        this.setUpdatedAt(updatedAt);
        return this;
    }

    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public ZonedDateTime getDeletedAt() {
        return this.deletedAt;
    }

    public Ajuda deletedAt(ZonedDateTime deletedAt) {
        this.setDeletedAt(deletedAt);
        return this;
    }

    public void setDeletedAt(ZonedDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Set<Topico> getTopicos() {
        return this.topicos;
    }

    public void setTopicos(Set<Topico> topicos) {
        if (this.topicos != null) {
            this.topicos.forEach(i -> i.removeAjudas(this));
        }
        if (topicos != null) {
            topicos.forEach(i -> i.addAjudas(this));
        }
        this.topicos = topicos;
    }

    public Ajuda topicos(Set<Topico> topicos) {
        this.setTopicos(topicos);
        return this;
    }

    public Ajuda addTopicos(Topico topico) {
        this.topicos.add(topico);
        topico.getAjudas().add(this);
        return this;
    }

    public Ajuda removeTopicos(Topico topico) {
        this.topicos.remove(topico);
        topico.getAjudas().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ajuda)) {
            return false;
        }
        return getId() != null && getId().equals(((Ajuda) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ajuda{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            ", conteudo='" + getConteudo() + "'" +
            ", ativo='" + getAtivo() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", deletedAt='" + getDeletedAt() + "'" +
            "}";
    }
}
