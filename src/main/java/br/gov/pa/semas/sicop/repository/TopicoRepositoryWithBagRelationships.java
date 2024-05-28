package br.gov.pa.semas.sicop.repository;

import br.gov.pa.semas.sicop.domain.Topico;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface TopicoRepositoryWithBagRelationships {
    Optional<Topico> fetchBagRelationships(Optional<Topico> topico);

    List<Topico> fetchBagRelationships(List<Topico> topicos);

    Page<Topico> fetchBagRelationships(Page<Topico> topicos);
}
