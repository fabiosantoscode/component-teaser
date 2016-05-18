import React from 'react';

export default class Teaser extends React.Component {
  static get propTypes() {
    return {
      image: React.PropTypes.shape({
        src: React.PropTypes.string,
      }),
      className: React.PropTypes.string,
      section: React.PropTypes.string,
      flyTitle: React.PropTypes.string,
      title: React.PropTypes.string.isRequired,
      dateTime: React.PropTypes.instanceOf(Date),
      dateString: React.PropTypes.string,
      timestampISO: React.PropTypes.string,
      dateFormat: React.PropTypes.func,
      text: React.PropTypes.node,
      extraGroupText: React.PropTypes.node,
      link: React.PropTypes.shape({
        href: React.PropTypes.string,
      }),
      renderLink: React.PropTypes.func,
      itemType: React.PropTypes.string,
      itemProp: React.PropTypes.string,
    };
  }
  static get defaultProps() {
    const tenMinutes = 10;
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
          return `${ day }${ postFix }`;
        }
        const shortMonthList = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        let minutes = date.getMinutes() < tenMinutes ? '0' : '';
        minutes += date.getMinutes();
        return `${ shortMonthList[date.getMonth()] }
                ${ addPostFix(date.getDate()) }
                ${ date.getFullYear() },
                ${ date.getHours() }:${ minutes }`;
      },
    };
  }
  wrapGroupsInLink(groups) {
    if (this.props.link) {
      const LinkComponent = this.props.renderLink || 'a';
      return (
        <LinkComponent {...this.props.link}
          className="teaser__link"
          itemProp="url"
        >{groups}</LinkComponent>);
    }
    return (
      <div className="teaser__wrapper">
        {groups}
      </div>
    );
  }
  render() {
    const teaserContent = [];
    const groups = [];
    const imageSrc = this.props.image && this.props.image.src;
    let imageClasses = [ 'teaser__group-image' ];
    if (!imageSrc) {
      imageClasses = imageClasses.concat([ 'teaser__group-image--empty' ]);
    }
    const image = imageSrc ?
      (<img {...this.props.image} itemProp="image" className="teaser__img" />) :
      null;
    groups.push((
      <div className={imageClasses.join(' ')} key="group-image">
        {image}
      </div>));
    if (this.props.section) {
      teaserContent.push((
        <h3
          className="teaser__section"
          itemProp="section"
          key="section"
        >{this.props.section}</h3>
      ));
    }
    if (this.props.flyTitle) {
      teaserContent.push((
        <h2
          className="teaser__flytitle"
          itemProp="alternativeHeadline"
          key="flytitle"
        >{this.props.flyTitle}</h2>
      ));
    }
    if (this.props.title) {
      teaserContent.push((
        <h1
          className="teaser__title"
          itemProp="headline"
          key="title"
        >{this.props.title}</h1>));
    }
    if (this.props.dateTime) {
      teaserContent.push((
        <time
          className="teaser__datetime"
          itemProp="dateCreated"
          dateTime={this.props.dateTime}
          key="datetime"
        >{this.props.dateFormat(this.props.dateTime)}</time>));
    }
    if (this.props.dateString && this.props.timestampISO) {
      teaserContent.push((
        <time
          className="teaser__datetime"
          itemProp="dateCreated"
          dateTime={this.props.timestampISO}
          key="datetime"
        >{this.props.dateString}</time>));
    }
    if (this.props.text) {
      teaserContent.push((
        <div
          className="teaser__text"
          itemProp="description"
          key="text"
        >
          {this.props.text}
        </div>
      ));
    }
    groups.push((
      <div className="teaser__group-text"
        key="grouptext"
      >
        {teaserContent}
        {this.props.extraGroupText}
      </div>
    ));
    const content = this.wrapGroupsInLink(groups);
    let classNames = [ 'teaser' ];
    if (this.props.className) {
      classNames = classNames.concat(this.props.className);
    }
    return (
      <article
        className={classNames.join(' ')}
        itemScope itemType={this.props.itemType} itemProp={this.props.itemProp}
        role="article"
      >{content}</article>
    );
  }
}
