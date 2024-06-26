package br.gov.pa.semas.sicop.domain;

import static br.gov.pa.semas.sicop.domain.AssuntoTestSamples.*;
import static br.gov.pa.semas.sicop.domain.TopicoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.gov.pa.semas.sicop.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class AssuntoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Assunto.class);
        Assunto assunto1 = getAssuntoSample1();
        Assunto assunto2 = new Assunto();
        assertThat(assunto1).isNotEqualTo(assunto2);

        assunto2.setId(assunto1.getId());
        assertThat(assunto1).isEqualTo(assunto2);

        assunto2 = getAssuntoSample2();
        assertThat(assunto1).isNotEqualTo(assunto2);
    }

    @Test
    void topicosTest() throws Exception {
        Assunto assunto = getAssuntoRandomSampleGenerator();
        Topico topicoBack = getTopicoRandomSampleGenerator();

        assunto.addTopicos(topicoBack);
        assertThat(assunto.getTopicos()).containsOnly(topicoBack);
        assertThat(topicoBack.getAssuntos()).containsOnly(assunto);

        assunto.removeTopicos(topicoBack);
        assertThat(assunto.getTopicos()).doesNotContain(topicoBack);
        assertThat(topicoBack.getAssuntos()).doesNotContain(assunto);

        assunto.topicos(new HashSet<>(Set.of(topicoBack)));
        assertThat(assunto.getTopicos()).containsOnly(topicoBack);
        assertThat(topicoBack.getAssuntos()).containsOnly(assunto);

        assunto.setTopicos(new HashSet<>());
        assertThat(assunto.getTopicos()).doesNotContain(topicoBack);
        assertThat(topicoBack.getAssuntos()).doesNotContain(assunto);
    }
}
