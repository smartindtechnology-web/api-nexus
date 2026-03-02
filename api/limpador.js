/**
 * Projeto Nexus - API de Redirecionamento e Extrator (Scraping)
 * Versão: 1.2
 */
export default async function handler(req, res) {
  // Permissões para não ser bloqueado
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');

  const { id } = req.query;

  // -------------------------------------------------------------
  // O CAMINHO AVANÇADO: EXTRAÇÃO EM TEMPO REAL
  // -------------------------------------------------------------
  if (id === 'homem-aranha') {
    try {
      // 1. Aqui você coloca o link da página do PLAYER do filme (não o m3u8)
      // Nota: Precisa ser o link direto da página onde o vídeo roda no Pobreflix/RedeCanais
      const urlDaPaginaDoPlayer = 'https://edge1-waw-sprintcdn.r66nv9ed.com/hls2/09/10880/50erk3ov4j9m_o/index-v1-a1.m3u8?t=9Oh9a2prRTpeTTAtNVmyN46OOwYyDwiD9SbTSuAf460&s=1772452814&e=10800&f=54400043&srv=1050&asn=&sp=4000&p=0';
      
      // 2. O servidor vai até o site e baixa o HTML da página
      const resposta = await fetch(urlDaPaginaDoPlayer, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' // Disfarce de navegador humano
        }
      });
      const htmlDaPagina = await resposta.text();

      // 3. O "Radar" (Regex) que procura qualquer link que termine em .m3u8 dentro do código do site
      const radarDeLinks = /(https:\/\/[^\s"'<>]+\.m3u8[^\s"'<>]*)/i;
      const linkCapturado = htmlDaPagina.match(radarDeLinks);

      // 4. Se ele achar o link com o token novo, redireciona para o app
      if (linkCapturado && linkCapturado[0]) {
        return res.redirect(linkCapturado[0]);
      } else {
        return res.status(404).send('Erro: O robô não conseguiu achar o link .m3u8 dentro dessa página.');
      }

    } catch (erro) {
      return res.status(500).send('Erro interno na hora de invadir a página: ' + erro.message);
    }
  }

  // -------------------------------------------------------------
  // NOSSO VÍDEO DE TESTE GARANTIDO
  // -------------------------------------------------------------
  if (id === 'filmeteste') {
    return res.redirect('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
  }

  // Se o canal ou filme não for encontrado
  res.status(404).send('Erro: ID nao encontrado no servidor Nexus.');
}
