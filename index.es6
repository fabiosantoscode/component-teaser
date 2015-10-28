import React from 'react';

export default class Teaser extends React.Component {
  static get propTypes() {
    return {
      teaserId: React.PropTypes.string.isRequired,
      image: React.PropTypes.object,
      section: React.PropTypes.string,
      flyTitle: React.PropTypes.string,
      title: React.PropTypes.string.isRequired,
      dateTime: React.PropTypes.instanceOf(Date),
      dateFormat: React.PropTypes.instanceOf(Function),
      text: React.PropTypes.string,
      link: React.PropTypes.object,
      itemType: React.PropTypes.string,
      itemProp: React.PropTypes.string,
      LinkComponent: React.PropTypes.oneOfType([
        React.PropTypes.func,
        React.PropTypes.string,
      ]),
    };
  }
  static get defaultProps() {
    return {
      itemType: 'http://schema.org/Article',
      itemProp: 'article',
      dateFormat: (date) => {
        // Sep 19th 2015, 9:49
        function addPostFix(day) {
          const daystr = day.toString();
          const lastChar = daystr.charAt(daystr.length - 1);
          let postFix = '';
          switch (lastChar) {
            case '1':
              postFix = 'st';
              break;
            case '2':
              postFix = 'nd';
              break;
            case '3':
              postFix = 'rd';
              break;
            default:
              postFix = 'th';
              break;
          }
          return `${day}${postFix}`;
        }
        const shortMonthList = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        let minutes = date.getMinutes() < 10 ? '0' : '';
        minutes += date.getMinutes();
        return `${shortMonthList[date.getMonth()]}
                ${addPostFix(date.getDay())}
                ${date.getFullYear()},
                ${date.getHours()}:${minutes}`;
      },
      LinkComponent: 'a',
    };
  }
  render() {
    const teaserContent = [];
    const groups = [];
    if (this.props.image) {
      groups.push((
        <div className="teaser__group-image"
          key={`teaser__group-image_${this.props.teaserId}`}
        >
          <img {...this.props.image}
            itemProp="image"
            className="teaser__img"
          />
        </div>));
    }
    if (this.props.section) {
      teaserContent.push((
        <h3
          className="teaser__section"
          itemProp="section"
          key={`teaser__section_${this.props.teaserId}`}
        >{this.props.section}</h3>
      ));
    }
    if (this.props.flyTitle) {
      teaserContent.push((
        <h2
          className="teaser__flytitle"
          itemProp="alternativeHeadline"
          key={`teaser__flytitle_${this.props.teaserId}`}
        >{this.props.flyTitle}</h2>
      ));
    }
    if (this.props.title) {
      teaserContent.push((
        <h1
          className="teaser__title"
          itemProp="headline"
          key={`teaser__title_${this.props.teaserId}`}
        >{this.props.title}</h1>));
    }
    if (this.props.dateTime) {
      teaserContent.push((
        <time
          className="teaser__datetime"
          itemProp="dateCreated"
          dateTime={this.props.dateTime}
          key={`teaser__datetime_${this.props.teaserId}`}
        >{this.props.dateFormat(this.props.dateTime)}</time>));
    }
    if (this.props.text) {
      teaserContent.push((
        <div
          className="teaser__text"
          itemProp="description"
          key={`teaser__text_${this.props.teaserId}`}
          /* eslint-disable react/no-danger */
          dangerouslySetInnerHTML={{
            '__html': this.props.text,
          }}
        />));
    }
    groups.push((
      <div className="teaser__group-text"
        key={`teaser__grouptext_${this.props.teaserId}`}
      >
        {teaserContent}
      </div>
    ));

    let content = {};
    if (this.props.link) {
      content = React.createElement(this.props.LinkComponent, {
        ...this.props.link,
        className: 'teaser__link',
        itemProp: 'url',
        children: groups,
      });
    } else {
      content = (
        <div className="teaser__wrapper">
          {groups}
        </div>
      );
    }
    return (
      <article
        className="teaser"
        itemScope itemType={this.props.itemType} itemProp={this.props.itemProp}
        role="article"
      >{content}</article>
    );
  }
}
