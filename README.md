# Documentação do Código Three.js

O código apresentado é um exemplo de aplicação utilizando a biblioteca Three.js para criar uma cena 3D interativa. Abaixo, descrevemos os principais processos realizados no código:

## Configuração Inicial

- O código começa obtendo um elemento `<canvas>` do documento HTML para renderizar a cena.

- Um renderizador WebGL é criado, usando o elemento `<canvas>` obtido anteriormente.

- São definidos os parâmetros da câmera, incluindo campo de visão (fov), relação de aspecto (aspect), plano de corte próximo (near) e plano de corte distante (far).

- Uma câmera de perspectiva é criada com base nos parâmetros definidos e posicionada ao longo do eixo Z.

- Uma cena vazia é criada.

## Criação do Della Symbol

- Um grupo (`THREE.Group`) chamado `dellaSymbol` é criado para conter os elementos do símbolo do React.

- São definidos tamanhos e imagens para os elementos do símbolo, como esferas e uma caixa.

- Quatro materiais diferentes são criados para os elementos, cada um com uma imagem e gif específico.

- Um loop cria quatro esferas posicionadas em um padrão circular com base nas imagens definidas e as adiciona ao grupo `dellaSymbol`.

- Uma textura de cubo é carregada usando uma textura previamente definida.

- Um material de Phong com a textura do cubo é criado.

- Uma caixa é criada com base nas dimensões definidas e com o material de cubo.

- O grupo `dellaSymbol` é adicionado à cena.

## Adição de Contexto

- Um plano é criado para dar contexto à cena.

- São definidos materiais e geometria para o plano.

- O plano é adicionado à cena.

## Configuração de Iluminação

- A cor e a intensidade de duas luzes direcionais são configuradas.

- Duas luzes direcionais são criadas com base nas configurações de cor e intensidade.

- As posições das luzes direcionais são definidas e elas são adicionadas à cena.

## Renderização

- Uma função chamada `render` é definida para renderizar a cena com a câmera.

- A função `requestAnimationFrame` é usada para chamar a função `render` continuamente para criar um loop de renderização.

## Interação do Mouse

- A interação do mouse para a rotação é adicionada ao `<canvas>`.

- Eventos de `mousedown`, `mousemove` e `mouseup` são registrados para detectar a movimentação do mouse.

- Quando o mouse é arrastado, a função `render` é chamada novamente para atualizar a cena com base no movimento do mouse.

## Inicialização

- A função `main` é chamada para iniciar o aplicativo.

- Esta função reúne todos os processos descritos acima e cria a cena interativa 3D.


https://github.com/user-attachments/assets/7ca245f9-e497-4a70-a4db-1c9e8d952e16


