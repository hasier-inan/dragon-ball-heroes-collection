import "./index.scss";

import React from "react";
import Modal from 'react-bootstrap/Modal';
import {fetchCollection} from './cms-client';
import CollectionItems from "collection-items";
import {CATEGORIES} from "./categories";
import _map from 'lodash/map';
import _merge from 'lodash/merge';

class DragonBallHeroesCollection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displayModal: false,
            categories: CATEGORIES,
            cards: {},
        };

        this.loadAllCards();
    }

    loadAllCards() {
        let {
            cards
        } = this.state;

        Promise.all(_map(CATEGORIES, 'id').map((id) => fetchCollection(id)
            .then((response) => {
                return {[id]: response};
            }))
        )
            .then((response) => {
                response.forEach(value => cards = _merge({}, cards, value));
                this.setState({cards});
            });
    }

    closeModal() {
        this.setState({displayModal: false});
    }

    renderModal() {
        const {
            displayModal,
        } = this.state;

        return (<Modal show={displayModal} onHide={this.closeModal.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>);
    }

    renderCollectionItems() {
        const {
            cards,
            categories,
        } = this.state;

        return (<CollectionItems
            items={cards}
            categories={categories}
            onItemClick={(item) => {
                console.log(item)
            }}
            defaultWidth={172}
            defaultHeight={250}
            displayFullCollection={false}
            enableBreadcrumb={false}
        />);
    }

    render() {
        return (
            <div className={'dragon-ball-heroes-collection'}>
                {this.renderModal()}
                {this.renderCollectionItems()}
            </div>);
    }
}

export default DragonBallHeroesCollection;
