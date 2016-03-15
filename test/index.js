import 'babel-polyfill';
import React from 'react';
import Teaser from '../src';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
chai.should();
chai.use(chaiEnzyme());

describe('A teaser', () => {
  describe('it\'s a React component', () => {
    it('is compatible with React.Component', () => {
      Teaser.should.be.a('function').and.respondTo('render');
    });
    it('it\'s renders a React element', () => {
      React.isValidElement(
        <Teaser
          title="Required"
        />).should.equal(true);
    });
  });
  describe('Expose a set of propTypes', () => {
    it('it renders a section', () => {
      const teaser = mount(
        <Teaser
          section="section"
          title="Required"
        />
      );
      teaser.should.have.exactly(1).descendants('.teaser__section');
      const sectionNode = teaser.find('.teaser__section');
      sectionNode.should.have.text('section');
      sectionNode.should.have.tagName('h3');
    });
    it('it renders a flytitle', () => {
      const teaser = mount(
        <Teaser
          flyTitle="flytitle"
          title="Required"
        />
      );
      teaser.should.have.exactly(1).descendants('.teaser__flytitle');
      const flyTitleNode = teaser.find('.teaser__flytitle');
      flyTitleNode.should.have.text('flytitle');
      flyTitleNode.should.have.tagName('h2');
    });
    it('it renders a title', () => {
      const teaser = mount(<Teaser title="title" />);
      teaser.should.have.exactly(1).descendants('.teaser__title');
      const titleNode = teaser.find('.teaser__title');
      titleNode.should.have.text('title');
      titleNode.should.have.tagName('h1');
    });
    it('it renders a dateTime', () => {
      const today = new Date();
      function dateFormat(date) {
        return date.toString();
      }
      const teaser = mount(
        <Teaser
          dateTime={today}
          title="Required"
          dateFormat={dateFormat}
        />
      );
      teaser.should.have.exactly(1).descendants('.teaser__datetime');
      const dateTimeNode = teaser.find('.teaser__datetime');
      dateTimeNode.should.have.text(today.toString());
      dateTimeNode.should.have.tagName('time');
      dateTimeNode.should.have.attr('datetime', today.toString());
    });
    it('renders a dateString and an ISO timestamp', () => {
      const today = 'someday';
      const todayISO = 'somedayISO';
      const teaser = mount(
        <Teaser
          title="Required"
          dateString={today}
          timestampISO={todayISO}
        />
      );
      teaser.should.have.exactly(1).descendants('.teaser__datetime');
      const dateTimeNode = teaser.find('.teaser__datetime');
      dateTimeNode.should.have.tagName('time');
      dateTimeNode.should.have.text('someday');
      dateTimeNode.should.have.attr('datetime', 'somedayISO');
    });
    it('it renders a text', () => {
      const teaser = mount(
        <Teaser
          text="Teaser text"
          title="Required"
        />
      );
      teaser.should.have.exactly(1).descendants('.teaser__text');
      const textNode = teaser.find('.teaser__text');
      textNode.should.have.text('Teaser text');
      textNode.should.have.tagName('div');
    });
    it('it renders an image', () => {
      const img = {
        src: '//cdn.static-economist.com/sites/all/themes/econfinal/images/svg/logo.svg',
        alt: 'Example',
      };
      const teaser = mount(
        <Teaser image={img}
          title="Required"
        />);
      teaser.should.have.exactly(1).descendants('.teaser__img');
      const imgNode = teaser.find('.teaser__img');
      imgNode.should.have.tagName('img');
      imgNode.should.have.attr('src', img.src);
      imgNode.should.have.attr('alt', img.alt);
    });
    it('it renders a link', () => {
      const teaser = mount(
        <Teaser
          link={{ href: 'http://www.economist.com' }}
          title="Required"
        />);
      teaser.should.have.exactly(1).descendants('.teaser__link');
      const linkNode = teaser.find('.teaser__link');
      linkNode.should.have.attr('href', 'http://www.economist.com');
      linkNode.should.have.tagName('a');
    });
  });
});
