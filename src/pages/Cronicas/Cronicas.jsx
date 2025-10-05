import { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

// Dados de exemplo - substitua pela sua API
const cronicasExemplo = [
  {
    id: 1,
    title: "Cachorro-Quente",
    author: "Jornal Teresa",
    body: `O caminho da minha sala até a portaria é sagrado, um ritual de purificação. Merdas são despejadas, junto com piadas e desabafos. É a hora em que solto as risadas e comentários que controlei dentro de mim durante toda a aula de Sandra. Melissa insiste em ressaltar, mais uma vez, seu orgulho de viver en Latinoamérica, ora em declínio, ora em ascensão. Lívia solta algum comentário filosófico que logo será esquecido no instante em que meus pés entrarem naquele ônibus.

É o fim de mais um dia, que em nada parece ter agregado. Eu poderia socar algo. Ou alguém.

Os alunos de praxe estendem seus celulares e cybershots para o pôr do sol no horizonte. Com o início da primavera, fica mais fácil combinar o fim das aulas com o momento exato em que o sol está a meio mastro, as cores variando de um lilás bem pálido para algo que se assemelha ao rosa, mas tem gosto de preguiça e de tudo que deveria ser bom. Os professores batem seus pontos e entram em seus carros, chiques para um brasileiro médio, enquanto eu me afirmo no futuro, tendo esta vida de servidor público, com provas que demoram eras para sequer serem corrigidas, quem dirá entregues.

Não deixo de ser mais uma; tiro a minha foto de pôr do sol e posto no Instagram com algum combo de emojis que pesquiso na internet. Não queremos todos ser vistos? Minhas pulseiras chacoalham na descida dos degraus, e o que era dia, há alguns segundos, é noite o suficiente para que os postes se acendam e iluminem os estudantes da noite que começam a chegar.

Lá embaixo, sou bombardeada por cookies e paçoquinhas à venda. Alunos buscando alguma grana em meio a um bombardeio de conhecimento no cérebro, que os fará ir a psicólogos que dirão que a solução dos seus problemas é um cronograma de estudos. Se fosse eu, gostaria que comprassem de mim; então clico na opção de Pix no crédito. Um problema para o meu eu do futuro resolver, como gosto de repetir para mim mesma sempre que gasto de forma imprudente. Notificações de quem eu não gostaria de receber, notas no SUAP; lembro de algumas afirmações diárias que vi no X (antigo Twitter) e as canto para afastar a minha ex-amiga, Desistência. Estou caminhando a tempo demais para isso agora.

Isso tudo é culpa do brainrot.

Meu coração só se alivia quando avisto a luz dos faróis descendo a RN. Deixo que a massa de alunos entrem, enquanto pago a passagem, deliciando-me com o meu cookie. Baunilha e chocolate afastam meu estresse e penso, pela primeira vez, de forma mais clara e obtusa. As queries estão lentas demais e travam o front. Não seria melhor criar índices compostos no banco?

Queria que ele gostasse de mim. Queria que fosse fácil gostar de mim. É, acho que deveria deixar de comer a salada crua que servem no almoço daqui.

— Não gosto quando pensa demais. Sempre distorce as coisas e faz parecer que o mundo tá acabando.

E é sempre ele que puxa a espiral e a deixa em tensão. Ofereço um pedaço de cookie e ele rejeita, como também sempre faz.

— Como sabe que estou pensando demais?
— Eu fico de olhar distante e você não é muito diferente.
— Só são 18:01. Espere eu pelo menos chegar em casa.
— Quando você tiver chegando em casa, é que meu ônibus tá chegando.
— Por isso mesmo. Te amo, John.

Um suspiro pesado, resignado, mas que aceita as coisas como estão. O amo mais um pouquinho depois disso.

— Você sabe que eu também te amo.

Talvez se eu falar menos…

Será que terei algum tempo para fazer algo esta noite que não envolva o IF? Ler, costurar, talvez assistir a um filme enquanto costuro… A Criada? Tantas coisas para ver, ler e fazer, mas o pensamento não toma forma e se esvai quando entro no ônibus e sou recebida pela típica cacofonia de sons. Calouros lá no fundo, com pandeiros e violões. Pedro Antônio faz as cadeiras de pole dance, flertando com quem tem rosto. Os casais dão selinhos e compartilham cachorros-quentes. Eu tenho quase certeza de que tem mais deles do que havia há uma semana atrás. Coisa da festa.

Sento por conveniência com quem já não tem muito cérebro pra gastar como eu. Artur ajeita minhas coisas no próprio colo como se fossem dele, e por alguns instantes minha mochila se poupa de encardir. Observo as pessoas entrarem: rostos conhecidos, rostos novos. Alguns minutos sem entrar ninguém. 18:05. Vejo Gustavo beijar Lívia pela janela. Quando o motorista dá sinal de ir, ele corre, gritando um audível “eu te amo”.

— O galã tinha que fazer uma grande saída, não é?

Hoje não parece apertado. Sair na minha parada não vai ser uma operação de resgate.

Um garoto lá no fundo luta para equilibrar um caderno na cabeça com um cachorro-quente por cima, tropeçando nos próprios pés, quase derrubando o lanche em cima da mochila do vizinho.

De um lado.
— A paiN tá jogando muito melhor esse split.
— Melhor nada, a LOUD ainda vai virar.

Do outro.
— O Flamengo vai passar vergonha de novo.
— Vergonha maior é torcer pro São Paulo.

Pelo visto, meu pai e meu tio vão passar o final de semana brigando.

Heloísa discute baixinho com Arthur (com th) sobre quem vai ficar com o último pedaço de cachorro-quente, enquanto alguém do fundo solta um “ai, trigonometria assunto do capeta” que quase me faz rir. A careca de Joaildo, mais uma vez, sendo a vilã de alguma história. Todo mundo vivendo mundos paralelos no mesmo espaço apertado, e eu me pergunto se algum dia eles também percebem que nada é tão importante quanto parece.

— Você soube que ****** e ******* terminaram? — Pedro Antônio cochicha no ouvido de Izabelly. Desculpe-me a censura, e devo acrescentar um graças a Deus.

O cheiro de abacaxi, body splash da Giovanna Baby e maionese temperada se mistura e invade meus sentidos, quase tão presente quanto o toque constante das mochilas batendo umas nas outras e em mim. O motor vibra sob meus pés e o barulho das conversas forma uma trilha sonora caótica, que de tão constante parece música. A menina do lado direito até faz batuque ritmado com os pés. Um vento frio entra pela janela entreaberta, bagunçando meu cabelo e arrepiando a nuca, lembrando que mesmo no meio do caos há pequenos instantes de silêncio se você não prestar atenção.

O ônibus arranca e as luzes da rua passam rápidas, borrando os rostos e os risos ao meu redor. No fone, Supercut da Lorde. Encosto a cabeça na janela e tento parar de pensar. Mas o vidro frio me devolve o reflexo de alguém que ainda não aprendeu a não se importar tanto. E talvez nunca aprenda. Amanhã vou rir das mesmas piadas, reclamar das mesmas coisas, sonhar os mesmos sonhos — e, quem sabe, inventar outros. Por enquanto, deixo que o balanço do ônibus seja suficiente.

Talvez, só talvez, isso seja viver.`,
    image:
      "https://ecejzvtwgbqddmqnbapx.supabase.co/storage/v1/object/public/imagens-noticias/ilustracoes/cachorroquente.jpg",
  },
];

function CronicaCard({ cronica, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      style={{
        backgroundColor: "var(--cards)",
        borderRadius: "15px",
        boxShadow: "var(--shadow)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow)";
      }}
    >
      {/* Imagem */}
      <div
        style={{
          width: "100%",
          height: "clamp(200px, 30vw, 250px)",
          backgroundColor: "var(--destaques)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!imageLoaded && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "var(--text)",
              fontFamily: "Libre Baskerville",
              fontSize: "0.9rem",
            }}
          >
            Carregando...
          </div>
        )}
        <img
          src={cronica.image}
          alt={cronica.title}
          onLoad={() => setImageLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: imageLoaded ? "block" : "none",
          }}
        />
      </div>

      {/* Conteúdo */}
      <div
        style={{
          padding: "clamp(1rem, 3vw, 1.5rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.5rem, 2vw, 1rem)",
          flex: 1,
        }}
      >
        <h2
          style={{
            fontFamily: "Playfair Display",
            color: "var(--titulo)",
            fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
            fontWeight: "bold",
            lineHeight: "1.3",
            margin: 0,
          }}
        >
          {cronica.title}
        </h2>

        <p
          style={{
            fontFamily: "Libre Baskerville",
            color: "var(--destaques)",
            fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          Por {cronica.author}
        </p>

        <p
          style={{
            fontFamily: "Libre Baskerville",
            color: "var(--text)",
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            lineHeight: "1.6",
            margin: 0,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {cronica.body}
        </p>

        <button
          onClick={() => onClick(cronica)}
          style={{
            backgroundColor: "var(--botões)",
            color: "var(--background)",
            border: "none",
            borderRadius: "20px",
            padding: "clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)",
            fontFamily: "Libre Baskerville",
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginTop: "auto",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--hover)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--botões)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.95)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
        >
          Ler Crônica Completa
        </button>
      </div>
    </article>
  );
}

export default function Cronicas() {
  const [cronicas] = useState(cronicasExemplo);

  const handleCronicaClick = (cronica) => {
    const params = new URLSearchParams({
      title: cronica.title,
      author: cronica.author,
      body: cronica.body,
      image: cronica.image,
    });

    window.location.href = `/cronica?${params.toString()}`;
    // Ou com React Router:
    // navigate(`/cronica?${params.toString()}`);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <Header />

      <main
        style={{
          padding: "clamp(1rem, 3vw, 2rem)",
          marginTop: "clamp(5rem, 10vw, 7rem)",
          maxWidth: "1400px",
          margin: "clamp(5rem, 10vw, 7rem) auto 2rem",
        }}
      >
        <h1
          style={{
            fontFamily: "Playfair Display",
            color: "var(--titulo)",
            textAlign: "center",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "bold",
            marginBottom: "clamp(2rem, 5vw, 3rem)",
          }}
        >
          Crônicas
        </h1>

        {/* Grid de Crônicas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
            padding: "0 clamp(0.5rem, 2vw, 1rem)",
          }}
        >
          {cronicas.map((cronica) => (
            <CronicaCard
              key={cronica.id}
              cronica={cronica}
              onClick={handleCronicaClick}
            />
          ))}
        </div>

        {/* Mensagem caso não haja crônicas */}
        {cronicas.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <p
              style={{
                color: "var(--text)",
                fontFamily: "Libre Baskerville",
                fontSize: "clamp(1rem, 3vw, 1.2rem)",
                textAlign: "center",
              }}
            >
              Nenhuma crônica disponível no momento.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
