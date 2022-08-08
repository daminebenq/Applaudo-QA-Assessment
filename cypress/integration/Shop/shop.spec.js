require('dotenv').config();
const URL = process.env.BASE_URL;

describe('Shopping functions', ()=>{
  beforeEach(() => {
    cy.visit(`${URL}`, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear()
      }
    });
  });

  it('test succeeds on adding an item to shopping cart', () => {
    cy.contains('Printed Summer Dress').click();
    cy.get('#quantity_wanted').clear().type('1');
    cy.get('#group_1').select('M');
    cy.get('[id="add_to_cart"]').click();
    cy.get('h2').contains('Product successfully added to your shopping cart');
    cy.get('span[class="ajax_cart_quantity"]').contains('1')
  });

  it('test succeeds on checking added to cart items matches the expected quantity', () => {
    cy.contains('Faded Short Sleeve T-shirts').click();
    cy.get('#quantity_wanted').clear().type('12');
    cy.get('#group_1').select('M');
    cy.get('[id="add_to_cart"]').click();
    cy.get('span[class="ajax_cart_quantity"]').contains('12');
  })

  it('test succeeds on removing item(s) from cart', () => {
    cy.contains('Faded Short Sleeve T-shirts').click();
    cy.get('#quantity_wanted').clear().type('2');
    cy.get('#group_1').select('S');
    cy.get('[id="add_to_cart"]').click();
    cy.get('[title="Close window"]').click();
    cy.get('[title="View my shopping cart"]').click();
    cy.get('[data-title="Delete"]').click();
    cy.get('span[class="ajax_cart_quantity"]').contains('0');
    cy.get('.alert-warning').contains('Your shopping cart is empty.');
 })

  it('test succeeds on searching and finding an item', () => {
    cy.get('#search_query_top').type('T-shirt');
    cy.get('[class="ac_results"]').contains('T-shirt');
    cy.wait(3000);
    cy.get('[itemprop="name"]').contains('T-shirt');
  })

  it('test fails on searching and not encountering  the expected output', () => {
    cy.get('#search_query_top').type('T-shirtt');
    cy.get('[class="ac_results"]').contains('T-shirt');
  })

  it('test fails on searching an  item and checking item photo correspondency', () => {
    cy.contains('Faded Short Sleeve T-shirts').click();
    cy.get('#quantity_wanted').type('2');
    cy.get('#group_1').select('M');
    cy.get('[id="add_to_cart"]').click();
    cy.get('span[class="ajax_cart_quantity"]').contains('12');
  })

  it('test succeeds on seeing the expected item big picture ', () => {
    cy.contains('Faded Short Sleeve T-shirts').click();
    cy.screenshot({ capture: 'fullPage' });
    cy.get('img[id="bigpic"]').scrollIntoView();
    cy.matchImageSnapshot('Faded Short Sleeve T-shirts', { threshold: 0.1, failureThreshold: 0.05, failureThresholdType: 'percent', capture: 'viewport' });
  })

  it('test fails on not seeing the expected item big picture', () => {
    cy.contains('Printed Summer Dress').click();
    cy.screenshot({ capture: 'fullPage' });
    cy.get('img[id="bigpic"]').scrollIntoView();
    cy.matchImageSnapshot('Faded Short Sleeve T-shirts', { threshold: 0.1, failureThreshold: 0.05, failureThresholdType: 'percent', capture: 'viewport' });
  })

  it('test succeeds on store information validation', () => {
    cy.get('#footer').scrollIntoView();
    cy.get('#block_contact_infos').should('be.visible');
    cy.document().then((doc) => {
      const storeInformation =  doc.querySelectorAll('ul[class="toggle-footer"]')[1];
      storeInformation.querySelectorAll('li')[1].innerHTML.includes('(347) 466-7432');
    })
    cy.document().then((doc) => {
      const storeInformation =  doc.querySelectorAll('ul[class="toggle-footer"]')[1];
      storeInformation.querySelectorAll('li')[2].innerHTML.includes('support@seleniumframework.com');
    })
  })
})
