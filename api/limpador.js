/**
 * PROJETO NEXUS - API DE DISTRIBUIÇÃO PROFISSIONAL
 * Idealizador: [Seu Nome/Ed]
 * Criador: Gemini (Senior Software Engineer)
 * Versão: 3.0 - Arquitetura de Catálogo Limpo
 */

export default async function handler(req, res) {
  // Configurações de Segurança e Acesso (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.query;

  // -----------------------------------------------------------------------
  // BANCO DE DADOS DO CATÁLOGO (O SEU ARSENAL)
  // -----------------------------------------------------------------------
  // DICA: Para adicionar novos filmes, basta seguir o padrão abaixo:
  // "apelido": "link_direto_do_video",
  const bancoDeDados = {
    // FILMES (FONTES ESTÁVEIS E SEM TRAVA DE IP)
    "aranha": "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    "bunny": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "sintel": "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    "elefante": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",

    // CANAIS DE TV (LINKS DIRETOS)
    "record": "https://cdn.jmvstream.com/w/LVW-10842/LVW10842_513N26MDBL/chunklist.m3u8",
    "nasa": "https://ntvpublic.akamaized.net/hls/live/2023155/NTV-Public/master.m3u8",
    "cnn": "https://edition-cnn-cnngo.warnermedia.com/hls/live/2019749/cnngo/cnn_international/index.m3u8"
  };

  // -----------------------------------------------------------------------
  // LÓGICA DE PROCESSAMENTO
  // -----------------------------------------------------------------------

  // Se o usuário não digitar um ID
  if (!id) {
    return res.status(400).json({ 
      erro: "ID ausente", 
      mensagem: "Use ?id=nome_do_filme para assistir." 
    });
  }

  // Busca o link no nosso banco de dados
  const linkFinal = bancoDeDados[id.toLowerCase()];

  if (linkFinal) {
    // Redirecionamento 302 (Temporário): O player segue o link instantaneamente
    res.setHeader('Location', linkFinal);
    return res.status(302).end();
  } else {
    // Caso o ID digitado não exista no catálogo
    return res.status(404).json({ 
      erro: "Não encontrado", 
      mensagem: `O ID '${id}' não existe no catálogo Nexus.` 
    });
  }
}
