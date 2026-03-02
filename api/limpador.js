/**
 * Projeto Nexus - Extrator Pro
 * Versão: 1.4
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  const { id } = req.query;

  if (id === 'homem-aranha') {
    try {
      // O link da página do player (onde você deu o F12)
      const urlPagina = 'https://edge1-waw-sprintcdn.r66nv9ed.com/hls2/09/10880/50erk3ov4j9m_o/index-v1-a1.m3u8?t=9Oh9a2prRTpeTTAtNVmyN46OOwYyDwiD9SbTSuAf460&s=1772452814&e=10800&f=54400043&srv=1050&asn=&sp=4000&p=0';
      
      const resposta = await fetch(urlPagina, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      
      const html = await resposta.text();

      // Radar focado no padrão do link que você me enviou
      const radarHDS = /(https:\/\/[^\s"'<>]+.m3u8\?t=[^\s"'<>]+)/i;
      const encontrado = html.match(radarHDS);

      if (encontrado && encontrado[0]) {
        // A MÁGICA: Além de redirecionar, avisamos o player que viemos do site oficial
        res.setHeader('Referer', 'https://pobreflix.biz/');
        return res.redirect(encontrado[0]);
      } else {
        return res.send("O robô não encontrou o .m3u8 no código. O site pode estar escondendo o link via JavaScript.");
      }

    } catch (erro) {
      return res.status(500).send('Erro: ' + erro.message);
    }
  }

  if (id === 'filmeteste') {
    return res.redirect('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
  }

  res.status(404).send('ID não encontrado.');
}
