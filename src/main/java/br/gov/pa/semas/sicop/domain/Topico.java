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
 * A Topico.
 */
@Entity
@Table(name = "topicos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Topico implements Serializable {

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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_topicos__ajudas",
        joinColumns = @JoinColumn(name = "topicos_id"),
        inverseJoinColumns = @JoinColumn(name = "ajudas_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "topicos" }, allowSetters = true)
    private Set<Ajuda> ajudas = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_topicos__assuntos",
        joinColumns = @JoinColumn(name = "topicos_id"),
        inverseJoinColumns = @JoinColumn(name = "assuntos_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "topicos" }, allowSetters = true)
    private Set<Assunto> assuntos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public UUID getId() {
        return this.id;
    }

    public Topico id(UUID id) {
        this.setId(id);
        return this;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitulo() {
        return this.titulo;
    }

    public Topico titulo(String titulo) {
        this.setTitulo(titulo);
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getConteudo() {
        return this.conteudo;
    }

    public Topico conteudo(String conteudo) {
        this.setConteudo(conteudo);
        return this;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public Boolean getAtivo() {
        return this.ativo;
    }

    public Topico ativo(Boolean ativo) {
        this.setAtivo(ativo);
        return this;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public ZonedDateTime getCreatedAt() {
        return this.createdAt;
    }

    public Topico createdAt(ZonedDateTime createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public Topico updatedAt(ZonedDateTime updatedAt) {
        this.setUpdatedAt(updatedAt);
        return this;
    }

    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public ZonedDateTime getDeletedAt() {
        return this.deletedAt;
    }

    public Topico deletedAt(ZonedDateTime deletedAt) {
        this.setDeletedAt(deletedAt);
        return this;
    }

    public void setDeletedAt(ZonedDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Set<Ajuda> getAjudas() {
        return this.ajudas;
    }

    public void setAjudas(Set<Ajuda> ajudas) {
        this.ajudas = ajudas;
    }

    public Topico ajudas(Set<Ajuda> ajudas) {
        this.setAjudas(ajudas);
        return this;
    }

    public Topico addAjudas(Ajuda ajuda) {
        this.ajudas.add(ajuda);
        return this;
    }

    public Topico removeAjudas(Ajuda ajuda) {
        this.ajudas.remove(ajuda);
        return this;
    }

    public Set<Assunto> getAssuntos() {
        return this.assuntos;
    }

    public void setAssuntos(Set<Assunto> assuntos) {
        this.assuntos = assuntos;
    }

    public Topico assuntos(Set<Assunto> assuntos) {
        this.setAssuntos(assuntos);
        return this;
    }

    public Topico addAssuntos(Assunto assunto) {
        this.assuntos.add(assunto);
        return this;
    }

    public Topico removeAssuntos(Assunto assunto) {
        this.assuntos.remove(assunto);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Topico)) {
            return false;
        }
        return getId() != null && getId().equals(((Topico) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Topico{" +
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
