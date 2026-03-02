/**
 * Projeto Nexus - Catálogo Profissional
 * Versão: 3.0
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;

  // DICIONÁRIO DE FILMES (Aqui você cadastra sua biblioteca)
  const catalogo = {
    "homem-aranha": "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    "batman": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "record": "https://cdn.jmvstream.com/w/LVW-10842/LVW10842_513N26MDBL/chunklist.m3u8"
  };

  if (catalogo[id]) {
    // Redirecionamento limpo e rápido
    return res.redirect(302, catalogo[id]);
  }

  res.status(404).send('Filme ou Canal não encontrado no catálogo Nexus.');
}
