package br.gov.pa.semas.sicop.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class PortariaTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Portaria getPortariaSample1() {
        return new Portaria().id(1L).numero(1L).ano(1).justificativaExclusao("justificativaExclusao1");
    }

    public static Portaria getPortariaSample2() {
        return new Portaria().id(2L).numero(2L).ano(2).justificativaExclusao("justificativaExclusao2");
    }

    public static Portaria getPortariaRandomSampleGenerator() {
        return new Portaria()
            .id(longCount.incrementAndGet())
            .numero(longCount.incrementAndGet())
            .ano(intCount.incrementAndGet())
            .justificativaExclusao(UUID.randomUUID().toString());
    }
}
