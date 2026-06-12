import type { Campeonato } from "@/types/campeonato";

export const STATUS_FILTERS = ["Todos", "Em Andamento", "Pendente", "Finalizado"] as const;

export const campeonatosMock: Campeonato[] = [
  {
    id: 1,
    nome: "Copa Verão 2025",
    descricao: "Torneio de futebol society com 16 times participantes",
    status: "Em Andamento",
    data: "Jan–Mar 2025",
    times: "16 times",
    formato: "Mata-mata",
  },
  {
    id: 2,
    nome: "Liga Empresarial",
    descricao: "Campeonato interno entre departamentos da empresa",
    status: "Em Andamento",
    data: "Fev–Abr 2025",
    times: "8 times",
    formato: "Pontos corridos",
  },
  {
    id: 3,
    nome: "Torneio Relâmpago",
    descricao: "Competição rápida de fim de semana, formato eliminatório",
    status: "Pendente",
    data: "Mar 2025",
    times: "12 times",
    formato: "Eliminatório",
  },
  {
    id: 4,
    nome: "Champions Interno",
    descricao: "Edição especial anual de futebol entre colaboradores",
    status: "Finalizado",
    data: "Dez 2024",
    times: "20 times",
    formato: "Grupos + mata-mata",
  },
  {
    id: 5,
    nome: "Copa Inverno 2024",
    descricao: "Campeonato de futebol 7 realizado no segundo semestre",
    status: "Finalizado",
    data: "Jul–Set 2024",
    times: "10 times",
    formato: "Pontos corridos",
  },
];