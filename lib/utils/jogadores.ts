// lib/utils/jogadores.ts
export function calcularIdade(dataNascimento: string | null | undefined): number | null {
  if (!dataNascimento) return null;

  const [ano, mes, dia] = dataNascimento.split("-").map(Number);
  if (!ano || !mes || !dia) return null;

  const hoje = new Date();
  let idade = hoje.getFullYear() - ano;

  const aniversarioJaPassou =
    hoje.getMonth() + 1 > mes ||
    (hoje.getMonth() + 1 === mes && hoje.getDate() >= dia);

  if (!aniversarioJaPassou) idade--;

  return idade;
}