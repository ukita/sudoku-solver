Sudoku Puzzle Solver
====================

Descrição
---------

Exércicio para resolução do Sudoku utilizando coloração de grafos.

Para chegar a solução, cada bloco é um vértice que tem como adjacência a coluna, linha e a caixa que ele se encontra.

Todos os vértices recebem como atributo `color` todos as possibilidades de coloração. Ex: `[1, 2 ,3, 4]`. A exceção são os campos que já possuem o valor predefinido.

Vai se retirar do atributo `color` todos as cores dos vértices em que o vértice em questão é adjacente até sobrar somente um cor.

Requisitos
----------

* node.js >= 8.8.1
* npm >= 5.4.2
* yarn >= 1.2.1

Como executar
-------------

* Primeiro clone o repositório
* Acesse a pasta e instale suas dependências executando o comando `yarn` ou `npm install`
* E execute o programa com o comando `yarn start` ou `npm start`

Referências
-----------

* [Solucionador de Sudoku com Teoria dos Grafos](https://medium.com/@random.wicket/solucionador-de-sudoku-com-teoria-dos-grafos-b62a4fa9609b)
* [Sudoku Solver by Peter Norvig](https://medium.com/towards-data-science/peter-norvigs-sudoku-solver-25779bb349ce)
* [Graph coloring based sudoku solver](https://github.com/imphasing/sudoku)
* [Welsh-Powell implemetantion](https://github.com/rsk7/welsh-powell)
* [Slides paulada](http://paginas.unisul.br/max.pereira/Grafos%20Aula%2009.pdf)
