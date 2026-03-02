/**
 * Projeto Nexus - Bypass de IP e Referer
 * Versão: 2.1
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;

  if (id === 'homem-aranha') {
    try {
      const urlPagina = 'https://edge1-waw-sprintcdn.r66nv9ed.com/hls2/09/10880/50erk3ov4j9m_o/index-v1-a1.m3u8?t=9Oh9a2prRTpeTTAtNVmyN46OOwYyDwiD9SbTSuAf460&s=1772452814&e=10800&f=54400043&srv=1050&asn=&sp=4000&p=0'; 
      
      const resposta = await fetch(urlPagina, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Referer': 'https://pobreflix.biz/'
        }
      });
      
      const html = await resposta.text();
      const radar = /(https:[^"'\s<>]+?\.m3u8[^"'\s<>]*)/i;
      const encontrado = html.match(radar);

      if (encontrado && encontrado[0]) {
        let linkFinal = encontrado[0].replace(/\\/g, '');

        // A MÁGICA: Vamos tentar forçar o redirecionamento 
        // mas avisando ao VLC para manter os cabeçalhos.
        res.setHeader('X-Forwarded-For', req.headers['x-forwarded-for'] || req.socket.remoteAddress);
        return res.redirect(307, linkFinal); // 307 mantém o método de requisição
      } else {
        return res.status(404).send("Link não encontrado.");
      }
    } catch (erro) {
      return res.status(500).send('Erro: ' + erro.message);
    }
  }

  if (id === 'filmeteste') return res.redirect('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
  res.status(404).send('ID inválido.');
}
