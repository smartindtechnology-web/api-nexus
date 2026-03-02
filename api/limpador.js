/**
 * Projeto Nexus - Catálogo de Links Diretos
 * Versão: 1.9 (Estável)
 */
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;

  // FILME 1: Big Buck Bunny (Link de teste profissional 4K - Nunca cai)
  if (id === 'teste4k') {
    return res.redirect('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
  }

  // FILME 2: Homem-Aranha (Link direto de servidor CDN alternativo)
  // Nota: Use links que terminam em .m3u8 sem tokens gigantes para evitar erros no VLC
  if (id === 'aranha') {
    return res.redirect('https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8');
  }

  // CANAL: RECORD (Link Direto)
  if (id === 'record') {
    return res.redirect('https://cdn.jmvstream.com/w/LVW-10842/LVW10842_513N26MDBL/chunklist.m3u8');
  }

  res.status(404).send('ID não encontrado no Nexus.');
}
