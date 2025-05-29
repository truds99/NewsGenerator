# arquivo: news-controller.ts
- função getSpecificNews() repete validação de id (DRY);
- função alterNews() repete validação de id (DRY);
- função deleteNews() repete validação de id (DRY);
- uso de magic string "Id is not valid." em múltiplos pontos;
- uso repetido de parseInt e verificação de isNaN — extraído para função parseAndValidateId();


# arquivo: error-handler.ts
- uso excessivo de if-else encadeados na função errorHandlingMiddleware();
- uso de magic strings como "NotFound", "Conflict", etc. dentro de comparações e respostas;
- violação de DRY na repetição das chamadas res.status().send(message);
- lógica de status HTTP poderia ser encapsulada em estrutura mais escalável (ex: map de erros);

# arquivo: schema-handler.ts
- uso de magic number 422 na resposta HTTP;
- uso de magic string "error" como chave na resposta JSON;

# arquivo: news-repository.ts
- funções têm nomes inconsistentes com o restante do projeto (ex: getNoticiaById vs getNews no controller);
- uso repetido de lógica para converter publicationDate em Date — viola DRY;

# arquivo: news-router.ts
- importação incorreta: `Router` está sendo importado diretamente de "express" em vez de `import { Router } from "express"`;
- nome do arquivo e do router não estão sincronizados semanticamente com o padrão REST (ex: pode causar confusão com "newsRoutes" ou "news.route.ts");

# arquivo: news-schema.ts
- uso de `joi` com letra minúscula na importação — inconsistente com a convenção comum de importar como `Joi`;

# arquivo: news-service.ts
- nomes das funções do repositório (getNoticias, getNoticiaById) estão inconsistentes com os nomes usados aqui — prejudica semântica e coesão;
- uso de magic strings em múltiplas exceções ("NotFound", "Conflict", "BadRequest") — deveriam ser constantes;
- uso de magic string para mensagem de erro: "News with title ... already exist", "The news text is too short", etc.;
- uso de número mágico: `500` como valor mínimo de caracteres do texto;
- função validate() mistura responsabilidades (validação de título e tamanho de texto) — função com múltiplas responsabilidades;

# arquivo: app.ts
- uso de número mágico 200 na resposta da rota /health;
- uso de magic string "I'm ok!" na resposta da rota /health;

# arquivo: server.ts
- uso de número mágico 3000 como fallback de porta;
- uso de magic string "Server is up and running." no log de inicialização;
