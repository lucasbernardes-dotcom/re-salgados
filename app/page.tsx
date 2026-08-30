'use client';

import { FormEvent, useState } from 'react';
import './menu.css';
import './order.css';
import './brand.css';

const whatsapp = '5554991652349';
const menuGroups = [
  { title: 'Fritos', items: [
    ['Pastel de carne', 'Crocante e recheado com carne temperada', 'salgado'],
    ['Risoles de frango', 'Massa caseira e recheio cremoso', 'salgado'],
    ['Enroladinho de salsicha', 'Clássico de festa, sempre querido', 'salgado'],
    ['Croquete', 'Massa saborosa e preparo artesanal', 'salgado'],
    ['Coxinha de frango', 'Frango bem temperado em cada mordida', 'salgado'],
    ['Bolinha de queijo', 'Clássica, cremosa e irresistível', 'salgado'],
  ] },
  { title: 'Assados', items: [
    ['Folhado de calabresa', 'Massa folhada dourada e muito sabor', 'salgado'],
    ['Folhado de frango', 'Douradinho, leve e recheado', 'salgado'],
    ['Empadinha de frango', 'Massa delicada e recheio cremoso', 'salgado'],
    ['Mini pizza de calabresa', 'Prática, saborosa e muito pedida', 'salgado'],
    ['Mini pizza de frango', 'Uma opção especial para variar', 'salgado'],
  ] },
  { title: 'Tradicionais e especiais', items: [
    ['Mini hot dog', 'Pequeno no tamanho, grande no sabor', 'salgado'],
    ['Barquete de frango', 'Recheio caprichado e apresentação especial', 'salgado'],
    ['Prensadinho de presunto e queijo', 'A combinação clássica que agrada', 'salgado'],
    ['Canudo de presunto e queijo', 'Crocante e perfeito para variar', 'salgado'],
    ['Mini hambúrguer', 'Carne moída e tempero caseiro', 'especial'],
  ] },
];

const Arrow = () => <span aria-hidden="true">↗</span>;
const Check = () => <span className="check-icon" aria-hidden="true">✓</span>;

export default function Home() {
  const [sent, setSent] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const allItems = menuGroups.flatMap((group) => group.items);
  const standardTotal = allItems.filter(([, , kind]) => kind !== 'especial').reduce((total, [name]) => total + (quantities[name] || 0), 0);
  const miniBurgers = quantities['Mini hambúrguer'] || 0;
  const itemTotal = standardTotal + miniBurgers;
  const standardPrice = itemTotal < 100 ? standardTotal * 1.6 : standardTotal * 1.5;
  const totalPrice = standardPrice + miniBurgers * 2.4;
  const minimumRemaining = Math.max(0, 50 - itemTotal);
  const orderIsReady = itemTotal >= 50;
  const totalText = totalPrice.toFixed(2).replace('.', ',');
  const minimumDate = new Date();
  minimumDate.setDate(minimumDate.getDate() + 4);
  const minimumDateValue = minimumDate.getFullYear() + '-' + String(minimumDate.getMonth() + 1).padStart(2, '0') + '-' + String(minimumDate.getDate()).padStart(2, '0');

  function setQuantity(name: string, value: number) {
    setQuantities((current) => ({ ...current, [name]: Math.max(0, Math.min(999, Number.isFinite(value) ? Math.floor(value) : 0)) }));
    setSent(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!orderIsReady) return;
    const data = new FormData(event.currentTarget);
    const items = allItems.filter(([name]) => quantities[name]).map(([name]) => '• ' + name + ': ' + quantities[name] + ' un.').join('\n');
    const message = 'Olá, Rê! Gostaria de confirmar esta encomenda.\n\nNome: ' + data.get('name') + '\nTelefone: ' + data.get('phone') + '\nData para retirada: ' + data.get('date') + '\nPagamento: ' + data.get('payment') + '\n\nPedido: ' + itemTotal + ' itens (' + standardTotal + ' salgados + ' + miniBurgers + ' mini hambúrgueres)\n' + items + '\n\nTotal do pedido: R$ ' + totalText + '\n\nEstou ciente de que a encomenda será confirmada somente após a confirmação do pagamento.';
    window.open('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return <main>
    <div className="announcement">Encomendas com 4 dias de antecedência <span>•</span> Erechim, RS</div>
    <nav className="nav shell"><a href="#inicio" className="brand" aria-label="Rê Salgados, início"><span className="brand-mark">Rê</span><span className="brand-name">Salgados</span></a><div className="nav-links"><a href="#cardapio">Cardápio</a><a href="#historia">A história</a><a href="#pedido">Encomende</a></div><a className="nav-cta" href="#pedido">Fazer pedido <Arrow /></a></nav>
    <section className="hero shell" id="inicio"><div className="hero-copy"><p className="eyebrow">Feito em casa, para momentos especiais</p><h1>O sabor que<br /><em>reúne</em> todo mundo.</h1><p className="hero-text">Salgados caseiros, fresquinhos e feitos com carinho pela Rê. Para dividir, celebrar e deixar qualquer encontro mais gostoso.</p><div className="hero-actions"><a className="button button-dark" href="#pedido">Quero encomendar <Arrow /></a><a className="text-link" href="#cardapio">Conhecer o cardápio <span>↓</span></a></div><div className="hero-meta"><span><b>01</b> produção artesanal</span><span><b>02</b> retirada no Bela Vista</span></div></div><div className="hero-art" aria-label="Composição gráfica da Rê Salgados"><div className="art-circle circle-one" /><div className="art-circle circle-two" /><div className="art-sun">✳</div><div className="art-card"><span>feito com</span><strong>calma<br />e cuidado</strong><small>desde sempre</small></div><div className="art-seal"><span>Rê</span><small>Salgados<br />caseiros</small></div><p className="art-caption">Um cento cheio de<br /><em>boas histórias.</em></p></div></section>
    <section className="marquee"><div>CASEIROS <span>✳</span> FRESQUINHOS <span>✳</span> ESPECIAIS <span>✳</span> CASEIROS <span>✳</span> FRESQUINHOS <span>✳</span> ESPECIAIS <span>✳</span></div></section>
    <section className="section shell intro-grid" id="historia"><div><p className="eyebrow">A história por trás do sabor</p><h2>Tem coisa que só fica boa quando é feita <em>à mão.</em></h2></div><div className="intro-body"><p>A Rê Salgados nasceu do prazer de receber bem. De uma cozinha cheia de cheiros bons, receitas cuidadas e da vontade de entregar para cada cliente o mesmo carinho que vai para a mesa da família.</p><p>Cada encomenda é preparada sob medida, com ingredientes escolhidos e aquele toque caseiro que não se encontra em qualquer lugar.</p><a href="#pedido" className="text-link">Faça sua encomenda <Arrow /></a></div></section>

    <section className="section menu-section" id="cardapio"><div className="shell">
      <div className="section-heading"><div><p className="eyebrow">Monte o seu pedido</p><h2>Escolha seus<br /><em>favoritos.</em></h2></div><p className="section-note">Selecione as unidades por sabor.<br />O pedido fica pronto para enviar.</p></div>
      <div className="order-progress"><div><span>Itens selecionados</span><strong>{itemTotal} <small>unidades</small></strong></div><div className="progress-track"><span style={{ width: Math.min(100, itemTotal / 50 * 100) + '%' }} /></div><p>{minimumRemaining > 0 ? 'Faltam ' + minimumRemaining + ' unidade' + (minimumRemaining === 1 ? '' : 's') + ' para atingir o pedido mínimo de meio cento.' : itemTotal < 100 ? 'De 50 a 99 itens, cada salgado custa R$ 1,60.' : 'Com 100 itens ou mais, cada salgado custa R$ 1,50. O mini hambúrguer mantém seu preço próprio.'}</p></div>
      <div className="menu-list">{menuGroups.map((group, groupIndex) => <div className="menu-group" key={group.title}><div className="menu-category"><span>0{groupIndex + 1}</span><h3>{group.title}</h3><small>Escolha a quantidade</small></div>{group.items.map(([name, note, kind], index) => { const qty = quantities[name] || 0; const isMini = kind === 'especial'; return <div className="menu-item menu-item-order" key={name}><span className="menu-number">{String(index + 1).padStart(2, '0')}</span><div className="menu-name"><h3>{name}</h3><p>{note}</p></div><span className={'menu-tag ' + kind}>{isMini ? 'R$ 2,40/un.' : 'R$ 1,50/un.'}</span><div className="quantity-control" aria-label={'Quantidade de ' + name}><button type="button" onClick={() => setQuantity(name, qty - 1)} aria-label={'Diminuir ' + name}>−</button><input type="number" min="0" value={qty || ''} placeholder="0" inputMode="numeric" onChange={(event) => setQuantity(name, Number(event.target.value))} aria-label={'Unidades de ' + name} /><button type="button" onClick={() => setQuantity(name, qty + 1)} aria-label={'Aumentar ' + name}>+</button></div></div>; })}</div>)}</div>
      <p className="menu-observation">Pedido mínimo: <strong>50 itens.</strong> O mini hambúrguer conta para a quantidade total do pedido, mas permanece em R$ 2,40 por unidade. De 50 a 99 itens, cada salgado custa R$ 1,60; com 100 itens ou mais, cada salgado custa R$ 1,50.</p>
      <div className="price-grid"><div><span>meio cento</span><strong>R$ 80</strong><small>50 unidades</small></div><div><span>até 99 un.</span><strong>R$ 1,60</strong><small>por salgado</small></div><div><span>a partir de 100 un.</span><strong>R$ 1,50</strong><small>por salgado</small></div><div className="price-special"><span>total parcial</span><strong>R$ {totalText}</strong><small>{miniBurgers} mini hambúrguer{miniBurgers === 1 ? '' : 'es'} incluído{miniBurgers === 1 ? '' : 's'}</small></div></div>
    </div></section>

    <section className="section shell values-grid"><div><p className="eyebrow">O jeito Rê de fazer</p><h2>Pequenos detalhes.<br /><em>Grande diferença.</em></h2></div><div className="value-cards"><div><Check /><h3>Massa e recheios artesanais</h3><p>Receitas preparadas pela própria Rê, com sabor de comida feita em casa.</p></div><div><Check /><h3>Feitos sempre fresquinhos</h3><p>A produção acontece sob encomenda, no tempo certo para chegar perfeita à sua mesa.</p></div><div><Check /><h3>Capricho em cada pedido</h3><p>Da cozinha à retirada, tudo é pensado para você receber bem.</p></div></div></section>
    <section className="order-section" id="pedido"><div className="shell order-grid"><div><p className="eyebrow light">Seu pedido, sem complicação</p><h2>Revise e envie <em>pronto.</em></h2><div className="pickup-info"><span className="pin">⌖</span><div><strong>Retirada no Bela Vista</strong><p>Rua Paulo Carlos Moron, 42<br />Erechim / RS</p></div></div><div className="rules"><span>Pix ou dinheiro</span><span>Somente retirada</span><span>Horário a combinar</span></div></div>
      <form className="order-form order-form-new" onSubmit={handleSubmit}><p className="form-title">Seus dados para finalizar.</p><div className="order-summary"><span>Resumo do pedido</span><strong>{standardTotal} salgados + {miniBurgers} mini hambúrguer{miniBurgers === 1 ? '' : 'es'}</strong><b>R$ {totalText}</b></div><label>Seu nome<input name="name" required placeholder="Como podemos te chamar?" /></label><div className="form-row"><label>Seu telefone<input name="phone" required inputMode="tel" placeholder="(54) 99999-9999" /></label><label>Data da retirada<input name="date" type="date" min={minimumDateValue} required /><small className="date-rule">Disponível a partir de {minimumDate.toLocaleDateString('pt-BR')}.</small></label></div><label>Forma de pagamento<select name="payment" required defaultValue=""><option value="" disabled>Selecione</option><option>Pix</option><option>Dinheiro</option></select></label><p className="payment-note">A encomenda será confirmada somente após a confirmação do pagamento.</p><button className="button button-gold" type="submit" disabled={!orderIsReady}>{orderIsReady ? 'Enviar pedido pelo WhatsApp' : 'Adicione mais ' + minimumRemaining + ' unidade' + (minimumRemaining === 1 ? '' : 's') + ' para continuar'} <Arrow /></button>{sent && <p className="form-success">Mensagem aberta no WhatsApp. Até já!</p>}</form>
    </div></section>
    <footer className="footer shell"><a href="#inicio" className="brand"><span className="brand-mark">Rê</span><span className="brand-name">Salgados</span></a><p>Caseiros. Fresquinhos. Especiais.</p><a href="https://wa.me/5554991652349" target="_blank" rel="noreferrer">54 9 9165 2349 <Arrow /></a></footer>
  </main>;
}
