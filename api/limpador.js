/**
 * Projeto Nexus - Extrator Final com Camuflagem
 * Versão: 1.8
 */
export default async function handler(req, res) {
  // Cabeçalhos de permissão total
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  const { id } = req.query;

  // Se o ID for o nosso filme
  if (id && id.includes('homem-aranha')) {
    try {
      const urlPagina = 'src="https://edge1-waw-sprintcdn.r66nv9ed.com/hls2/09/10880/50erk3ov4j9m_o/index-v1-a1.m3u8?t=9Oh9a2prRTpeTTAtNVmyN46OOwYyDwiD9SbTSuAf460&s=1772452814&e=10800&f=54400043&srv=1050&asn=&sp=4000&p=0"'; 
      
      const resposta = await fetch(urlPagina, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Referer': 'https://pobreflix.biz/'
        }
      });
      
      const html = await resposta.text();
      // Radar focado em links m3u8 com tokens
      const radar = /(https:[^"'\s<>]+?\.m3u8[^"'\s<>]*)/i;
      const encontrado = html.match(radar);

      if (encontrado && encontrado[0]) {
        const linkFinal = encontrado[0].replace(/\\/g, '');
        
        // FORÇAMOS O REDIRECIONAMENTO COM STATUS 302
        res.writeHead(302, {
          'Location': linkFinal,
          'Content-Type': 'application/vnd.apple.mpegurl'
        });
        return res.end();
      } else {
        return res.status(404).send("Link expirou ou nao foi encontrado.");
      }
    } catch (e) {
      return res.status(500).send("Erro: " + e.message);
    }
  }

  // Teste padrão
  if (id === 'filmeteste') return res.redirect('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
  
  res.status(404).send('ID Invalido');
}
