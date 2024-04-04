//array
let participantes = [
    {
        nome: "Diego Fernandes",
        email: "diego@gmail.com",
        dataInscricao: new Date(2024, 2, 1, 19, 23),
        dataCheckIn: new Date(2024, 2, 1, 20, 20)
    },
    {
        nome: "Mayk Brito",
        email: "mayk@gmail.com",
        dataInscricao: new Date(2024, 3, 1, 19, 23),
        dataCheckIn: null
    },
    {
        nome: "Fernanda Costa",
        email: "fernanda@gmail.com",
        dataInscricao: new Date(2024, 3, 3, 19, 23),
        dataCheckIn: new Date(2024, 3, 3, 20, 20)
    },
    {
        nome: "João Silva",
        email: "joao@gmail.com",
        dataInscricao: new Date(2024, 1, 4, 19, 23),
        dataCheckIn: new Date(2024, 3, 4, 20, 20)
    },
    {
        nome: "Maria Santos",
        email: "maria@gmail.com",
        dataInscricao: new Date(2024, 1, 5, 19, 23),
        dataCheckIn: null
    },
    {
        nome: "Pedro Almeida",
        email: "pedro@gmail.com",
        dataInscricao: new Date(2024, 0, 6, 19, 23),
        dataCheckIn: new Date(2024, 0, 6, 20, 20)
    },
    {
        nome: "Ana Pereira",
        email: "ana@gmail.com",
        dataInscricao: new Date(2024, 2, 7, 19, 23),
        dataCheckIn: new Date(2024, 2, 7, 20, 20)
    },
    {
        nome: "Carlos Souza",
        email: "carlos@gmail.com",
        dataInscricao: new Date(2024, 1, 8, 19, 23),
        dataCheckIn: new Date(2024, 1, 8, 20, 20)
    },
    {
        nome: "Lúcia Oliveira",
        email: "lucia@gmail.com",
        dataInscricao: new Date(2024, 0, 9, 19, 23),
        dataCheckIn: null
    },
    {
        nome: "Rafaela Lima",
        email: "rafaela@gmail.com",
        dataInscricao: new Date(2024, 01, 10, 19, 23),
        dataCheckIn: null
    }
];

console.log(participantes);


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to (participante.dataInscricao)

  let dataCheckIn = dayjs (Date.now()) 
  .to (participante.dataCheckIn)

//condicional
  if(participante.dataCheckIn== null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar Check-in
      </button>
    `
  }

  return `
   <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td> ${dataInscricao} </td>
    <td> ${dataCheckIn} </td>
  </tr>
  `
 }

const atualizarLista = (participantes) => {
  let output = ""
  //estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante (participante)
    //faça alguma coisa
  }
  //substituir informação do HTML
  document
  .querySelector ('tbody')
  .innerHTML = output
} //arrow function

atualizarLista (participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
 //confirmar se realmente quer o check-in
 const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

 if(confirm(mensagemConfirmacao) == false) {
  return
 }

 //encontrar o participante dentro da lista
 const participante = participantes.find(
  (p)=> p.email == event.target.dataset.email
 )
 //atualizar o check-in do participante
 participante.dataCheckIn = new Date()
 //atualizar a lista de participantes
 atualizarLista(participantes)
}