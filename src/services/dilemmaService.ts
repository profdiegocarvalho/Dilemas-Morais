import { Dilemma } from "../types";

export const fallbackDilemmas: Dilemma[] = [
  {
    id: "fallback-1",
    question: "O carro autônomo deve priorizar a vida de passageiros ou pedestres?",
    optionA: {
      id: "fa-1",
      description: "O carro desvia para um muro de concreto, sacrificando os passageiros para salvar um grupo de crianças na faixa.",
      lane: "right",
      willHit: true
    },
    optionB: {
      id: "fb-1",
      description: "O carro segue o trajeto original, atingindo o grupo de crianças para proteger a integridade dos passageiros.",
      lane: "left",
      willHit: true
    }
  }
];
