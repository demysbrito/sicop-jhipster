package br.gov.pa.semas.sicop.repository;

import br.gov.pa.semas.sicop.domain.Ajuda;
import java.util.UUID;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Ajuda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AjudaRepository extends JpaRepository<Ajuda, UUID> {}
