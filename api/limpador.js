/**
 * Projeto Nexus - Robô Proxy Avançado
 * Versão: 2.0
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  const { id } = req.query;

  if (id === 'homem-aranha') {
    try {
      // 1. O link da página do player (onde você deu o F12)
      const urlPagina = 'src="https://edge1-waw-sprintcdn.r66nv9ed.com/hls2/09/10880/50erk3ov4j9m_o/index-v1-a1.m3u8?t=9Oh9a2prRTpeTTAtNVmyN46OOwYyDwiD9SbTSuAf460&s=1772452814&e=10800&f=54400043&srv=1050&asn=&sp=4000&p=0"'; 
      
      const config = {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Referer': 'https://pobreflix.biz/'
        }
      };

      // 2. O robô entra na página e caça o link .m3u8
      const respostaPagina = await fetch(urlPagina, config);
      const html = await respostaPagina.text();
      const radar = /(https:[^"'\s<>]+?\.m3u8[^"'\s<>]*)/i;
      const linkCapturado = html.match(radar);

      if (linkCapturado && linkCapturado[0]) {
        const urlFinalDoFilme = linkCapturado[0].replace(/\\/g, '');

        // 3. A MÁGICA DO PROXY: O robô agora busca o conteúdo do arquivo M3U8
        const respostaFilme = await fetch(urlFinalDoFilme, config);
        const conteudoM3U8 = await respostaFilme.text();

        // 4. Entregamos o conteúdo direto para o VLC com o formato correto
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        return res.send(conteudoM3U8);
      } else {
        return res.status(404).send("Link não encontrado no código da página.");
      }

    } catch (erro) {
      return res.status(500).send('Erro no Robô-Proxy: ' + erro.message);
    }
  }

  // Mantendo o teste padrão
  if (id === 'filmeteste') return res.redirect('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
  res.status(404).send('ID não encontrado.');
}
