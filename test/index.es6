import Teaser from '../index.es6';
import React from 'react/addons';

const TestUtils = React.addons.TestUtils;
describe(`A teaser`, () => {
  describe(`it's a React component`, () => {
    it('is compatible with React.Component', () => {
      Teaser.should.be.a('function').and.respondTo('render');
    });
    it(`it's renders a React element`, () => {
      React.isValidElement(
        <Teaser
          title="Required"
          teaserId={1}
        />).should.equal(true);
    });
  });
  describe(`Expose a set of propTypes`, () => {
    it(`it renders a flytitle`, () => {
      const teaser = TestUtils.renderIntoDocument(
        <Teaser
          flyTitle="flytitle"
          title="Required"
          teaserId={1}
        />
      );
      const elm = TestUtils.findRenderedDOMComponentWithClass(
      teaser, 'teaser__flytitle');
      elm.props.className.should.be.equal('teaser__flytitle');
      elm.props.children.should.be.equal('flytitle');
    });
    it(`it renders a title`, () => {
      const teaser = TestUtils.renderIntoDocument(
        <Teaser title="title" teaserId={1}/>
      );
      const elm = TestUtils.findRenderedDOMComponentWithClass(
      teaser, 'teaser__title');
      elm.props.className.should.be.equal('teaser__title');
      elm.props.children.should.be.equal('title');
    });
    it(`it renders a dateTime`, () => {
      const today = new Date();
      function dateFormat(date) {
        return date.toString();
      }
      const teaser = TestUtils.renderIntoDocument(
        <Teaser
          dateTime={today}
          title="Required"
          teaserId={1}
          dateFormat={dateFormat}
        />
      );
      const elm = TestUtils.findRenderedDOMComponentWithClass(
      teaser, 'teaser__datetime');
      elm.props.className.should.be.equal('teaser__datetime');
      elm.props.children.should.be.equal(today.toString());
    });
    it(`it renders a text`, () => {
      const teaser = TestUtils.renderIntoDocument(
        <Teaser
          text="Teaser text"
          title="Required"
          teaserId={1}
        />
      );
      const elm = TestUtils.findRenderedDOMComponentWithClass(
      teaser, 'teaser__text');
      elm.props.className.should.be.equal('teaser__text');
      elm.props.children.should.be.equal('Teaser text');
    });
    it(`it renders an image`, () => {
      const img = {
        src: `//cdn.static-economist.com/sites/all/themes/econfinal/images/svg/logo.svg`,
        alt: `Example`,
      };
      const teaser = TestUtils.renderIntoDocument(
        <Teaser image={img}
          title="Required"
          teaserId={1}
        />);
      const elm = TestUtils.findRenderedDOMComponentWithClass(
      teaser, 'teaser__img');
      elm.props.className.should.be.equal('teaser__img');
      elm.props.src.should.be.equal('//cdn.static-economist.com/sites/all/themes/econfinal/images/svg/logo.svg');
      elm.props.alt.should.be.equal('Example');
    });
    it(`it renders a link`, () => {
      const teaser = TestUtils.renderIntoDocument(
        <Teaser
          link={{ href: `http://www.economist.com` }}
          title="Required"
          teaserId={1}
        />);
      const elm = TestUtils.findRenderedDOMComponentWithClass(
      teaser, 'teaser__link');
      elm.props.className.should.be.equal('teaser__link');
      elm.props.href.should.be.equal('http://www.economist.com');
    });
  });
});
