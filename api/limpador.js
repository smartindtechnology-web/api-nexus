/**
 * Projeto Nexus - Otimizador de Fontes
 * Versão: 2.3
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;

  // TESTE DE CANAL (A Record sempre funciona porque não tem trava de IP)
  if (id === 'record') {
    return res.redirect('https://cdn.jmvstream.com/w/LVW-10842/LVW10842_513N26MDBL/chunklist.m3u8');
  }

  // TESTE DE FILME (Fonte Alternativa menos protegida que o Pobreflix)
  if (id === 'filme') {
    try {
      // Usando um link de servidor de teste que aceita conexões de qualquer IP
      const linkAlternativo = 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8';
      
      res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
      return res.redirect(302, linkAlternativo);
    } catch (e) {
      return res.status(500).send("Erro na fonte.");
    }
  }

  // Se você insistir no Pobreflix, vamos tentar um "Proxy de Cabeçalho"
  if (id === 'homem-aranha') {
     // O problema aqui é físico (IP do Vercel vs Seu IP). 
     // Recomendo usarmos fontes de 'Embed' direto.
     return res.status(403).send("Fonte Pobreflix bloqueada por IP. Use o ID 'filme' para testar a nova fonte.");
  }

  res.status(404).send('ID Nexus não encontrado.');
}
