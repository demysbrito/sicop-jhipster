package br.gov.pa.semas.sicop.repository;

import br.gov.pa.semas.sicop.domain.Assunto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Assunto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssuntoRepository extends JpaRepository<Assunto, Long> {}
