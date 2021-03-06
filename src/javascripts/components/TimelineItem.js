import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import moment from 'moment';
import marked from 'marked';

import TimelineForm from 'components/TimelineForm';
import TimelineActions from 'actions/TimelineActions';
import SessionStore from 'stores/SessionStore';
import storeMixin from 'mixins/StoreMixin';

import 'components/TimelineItem.scss';

marked.setOptions({
  sanitize: true,
});

export default React.createClass({
  propTypes: {
    id: PropTypes.string.isRequired,
    item: PropTypes.instanceOf(Map).isRequired,
  },

  mixins: [storeMixin(SessionStore)],

  getInitialState() {
    return {
      isEditing: false,
      showImage: false
    };
  },

  getStateFromStores() {
    return {
      isLoggedIn: SessionStore.isLoggedIn(),
    };
  },

  render() {
    const item = this.props.item;
    const rawMarkup = marked(item.get('text'));
    let inputNode;
    let itemNode;
    let userActions;
    if (this.state.isLoggedIn) {
      userActions = (
        <div>
          <a onClick={this._onClickEdit}>Edit</a>
          <a onClick={this._onClickDelete}>Delete</a>
        </div>
      );
    }
    let imageNode;
    if (item.get('images').size > 0) {
      if (this.state.showImage) {
        imageNode = (
          <div>
            <ul>
              {item.get('images').map((image, index) =>
                <li key={index}>
                  <img src={image} />
                </li>
              )}
            </ul>
            <a onClick={this._toggleShowImage}>Hide image</a>
          </div>
        )
      } else {
        imageNode = (
          <div>
            <a onClick={this._toggleShowImage}>Show image</a>
          </div>
        )
      }
    }

    if (this.state.isEditing) {
      inputNode = (
        <TimelineForm
          onFormSubmit={this._onSave}
          onFormCancel={this._onCancel}
          item={item} />
      );
    } else {
      itemNode = (
        <div>
          <div className='TimelineItem__date'>{moment(item.get('date')).format('YYYY/MM/DD')}</div>
          <div className='TimelineItem__text' dangerouslySetInnerHTML={{__html: rawMarkup}} />
          <div className='TimelineItem__images'>
            {item.get('images').map((image, index) =>
               <img key={index}
                  className='TimelineItem__image'
                  src={image} />
            )}
          </div>
          {userActions}
        </div>
      );
    }
    return (
      <div className='TimelineItem'>
        {inputNode}
        {itemNode}
      </div>
    );
  },

  _onClickEdit() {
    this.setState({isEditing: true});
  },

  _onClickDelete() {
    if (confirm('Are you sure?')) {
      TimelineActions.deleteItem(this.props.id);
    }
  },

  _onSave(item) {
    TimelineActions.updateItem(this.props.id, item);
    this.setState({isEditing: false});
  },

  _onCancel() {
    this.setState({isEditing: false});
  },

  _toggleShowImage() {
    this.setState({showImage: !this.state.showImage});
  }

});
