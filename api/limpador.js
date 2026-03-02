// Projeto Nexus - API de Redirecionamento
// Versão: 1.1
export default function handler(req, res) {
  // Permite que o App Nexus e o VLC acessem sem bloqueios
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');

  const { id } = req.query;

  // FILME: HOMEM-ARANHA (Seu link real com token)
  if (id === 'aranha') {
    return res.redirect('https://be7713.rcr82.waw05.r66nv9ed.com/hls2/06/02621/qsf7x3z14qeq_x/master.m3u8?t=CQ_VdzL8mrVovn8qHzXacnDQNPA3eVgrBkPytXRkGKE&s=1772366146&e=10800&f=49614634&srv=1075&asn=&sp=5500&p=0');
  }

  // FILME: TESTE DE VÍDEO (Um link m3u8 aberto que nunca cai, para garantirmos que o player lê)
  if (id === 'filmeteste') {
    return res.redirect('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
  }

  // Se o filme não for encontrado
  res.status(404).send('Erro: Filme nao encontrado no servidor Nexus.');
}
