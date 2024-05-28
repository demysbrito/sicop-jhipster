package br.gov.pa.semas.sicop.domain;

import static br.gov.pa.semas.sicop.domain.AjudaTestSamples.*;
import static br.gov.pa.semas.sicop.domain.AssuntoTestSamples.*;
import static br.gov.pa.semas.sicop.domain.TopicoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.gov.pa.semas.sicop.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TopicoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Topico.class);
        Topico topico1 = getTopicoSample1();
        Topico topico2 = new Topico();
        assertThat(topico1).isNotEqualTo(topico2);

        topico2.setId(topico1.getId());
        assertThat(topico1).isEqualTo(topico2);

        topico2 = getTopicoSample2();
        assertThat(topico1).isNotEqualTo(topico2);
    }

    @Test
    void ajudasTest() throws Exception {
        Topico topico = getTopicoRandomSampleGenerator();
        Ajuda ajudaBack = getAjudaRandomSampleGenerator();

        topico.addAjudas(ajudaBack);
        assertThat(topico.getAjudas()).containsOnly(ajudaBack);

        topico.removeAjudas(ajudaBack);
        assertThat(topico.getAjudas()).doesNotContain(ajudaBack);

        topico.ajudas(new HashSet<>(Set.of(ajudaBack)));
        assertThat(topico.getAjudas()).containsOnly(ajudaBack);

        topico.setAjudas(new HashSet<>());
        assertThat(topico.getAjudas()).doesNotContain(ajudaBack);
    }

    @Test
    void assuntosTest() throws Exception {
        Topico topico = getTopicoRandomSampleGenerator();
        Assunto assuntoBack = getAssuntoRandomSampleGenerator();

        topico.addAssuntos(assuntoBack);
        assertThat(topico.getAssuntos()).containsOnly(assuntoBack);

        topico.removeAssuntos(assuntoBack);
        assertThat(topico.getAssuntos()).doesNotContain(assuntoBack);

        topico.assuntos(new HashSet<>(Set.of(assuntoBack)));
        assertThat(topico.getAssuntos()).containsOnly(assuntoBack);

        topico.setAssuntos(new HashSet<>());
        assertThat(topico.getAssuntos()).doesNotContain(assuntoBack);
    }
}
