import type { Metadata } from "next";
import { ExternalLink } from "@/components/ExternalLink";
import { LIMITATIONS } from "@/content/limitations";
import { REFERENCE_GROUPS } from "@/content/references";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Saiba mais",
  description: "Como o Adapta+ funciona, suas limitações e os documentos oficiais que o inspiram.",
};

const SECTIONS = [
  { id: "como-funciona", label: "Como funciona" },
  { id: "limitacoes", label: "Limitações" },
  { id: "privacidade", label: "Privacidade e dados" },
  { id: "referencias", label: "Documentos oficiais" },
] as const;

export default function LearnMorePage() {
  return (
    <main id="conteudo" className={styles.main}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Saiba mais sobre o Adapta+</h1>
        <p className={styles.lead}>
          Entenda como as atividades são adaptadas, o que o sistema não faz e quais documentos
          oficiais servem de base.
        </p>
      </div>

      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="Nesta página">
          <p className={styles.tocTitle}>Nesta página</p>
          <ul className={styles.tocList}>
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a className={styles.tocLink} href={`#${section.id}`}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.content}>
          <section id="como-funciona" className={styles.section} aria-labelledby="h-como">
            <h2 id="h-como" className={styles.sectionTitle}>
              Como funciona
            </h2>
            <ol className={styles.steps}>
              <li>
                <strong>Você envia a atividade e escolhe o perfil.</strong> Cada perfil reúne
                regras de linguagem e de organização do conteúdo.
              </li>
              <li>
                <strong>A IA reescreve a linguagem e a estrutura.</strong> Ela deve manter o
                objetivo, as questões e as informações do original.
              </li>
              <li>
                <strong>O sistema aplica a formatação visual.</strong> Fonte, espaçamento e cor de
                fundo vêm das regras do perfil, não da IA.
              </li>
              <li>
                <strong>Você revisa antes de usar.</strong> A palavra final é sempre do professor.
              </li>
            </ol>
          </section>

          <section id="limitacoes" className={styles.section} aria-labelledby="h-limites">
            <h2 id="h-limites" className={styles.sectionTitle}>
              Limitações
            </h2>
            <p className={styles.sectionLead}>
              Conhecer o que o sistema não faz ajuda a usá-lo com segurança.
            </p>
            <ul className={styles.cards}>
              {LIMITATIONS.map((item) => (
                <li key={item.title} className={styles.card}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="privacidade" className={styles.section} aria-labelledby="h-privacidade">
            <h2 id="h-privacidade" className={styles.sectionTitle}>
              Privacidade e dados
            </h2>
            <div className={styles.notice}>
              <p>
                O texto da atividade é enviado ao serviço Gemini, da Google, para ser adaptado.
                Segundo os termos da Google, no uso gratuito o conteúdo enviado pode ser usado
                para melhorar seus produtos e lido por revisores humanos. No uso pago, a Google
                informa que não usa esse conteúdo para esse fim.
              </p>
              <p>
                Por isso, <strong>não inclua nomes, laudos ou outros dados pessoais de alunos</strong>
                . A LGPD tem regras específicas para dados de crianças e adolescentes. O Adapta+
                não salva atividades nem exige cadastro.
              </p>
              <p>
                Os termos podem mudar. Confira a versão atual na página oficial da Google, listada
                abaixo.
              </p>
            </div>
          </section>

          <section id="referencias" className={styles.section} aria-labelledby="h-ref">
            <h2 id="h-ref" className={styles.sectionTitle}>
              Documentos oficiais e referências
            </h2>
            <p className={styles.sectionLead}>
              As regras dos perfis foram inspiradas nos documentos abaixo. O Adapta+ não é
              certificado nem endossado por essas instituições, e as regras devem ser revisadas
              por um psicopedagogo ou educador especial. Os links abrem sites externos, cujo
              conteúdo pode mudar.
            </p>

            {REFERENCE_GROUPS.map((group) => (
              <div key={group.id} className={styles.group}>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <p className={styles.groupText}>{group.description}</p>
                <ul className={styles.cards}>
                  {group.items.map((item) => (
                    <li key={item.id} className={styles.card}>
                      <h4 className={styles.cardTitle}>{item.title}</h4>
                      <p className={styles.issuer}>{item.issuer}</p>
                      <p className={styles.cardText}>{item.summary}</p>
                      <p className={styles.cardText}>
                        <strong>Uso no Adapta+:</strong> {item.usage}
                      </p>
                      <ExternalLink href={item.url}>Abrir documento oficial</ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}