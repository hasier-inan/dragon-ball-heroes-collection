import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
import Modal from 'react-bootstrap/Modal';
import {fetchCollection} from './cms-client';
import CollectionItems from "collection-items";
import {CATEGORIES} from "./categories";
import _map from 'lodash/map';
import _groupBy from 'lodash/groupBy';
import _merge from 'lodash/merge';
import _flatten from 'lodash/flatten';
import _values from 'lodash/values';
import Card from "./card";

class DragonBallHeroesCollection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displayModal: false,
            categories: CATEGORIES,
            cards: {},
            characters: [],
        }

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

                const characters = Object.keys(_groupBy(_flatten(_values(cards)), 'character'));
                this.setState({cards, characters});
            });
    }

    closeModal() {
        this.setState({displayModal: false});
    }

    renderModal() {
        const {
            displayModal,
            card,
        } = this.state;

        if (card) {
            return (<Modal show={displayModal} onHide={this.closeModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className={'card-title'}>{card.title}</div>
                        <div className={'card-title'}>{card.character}</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card {...card}/>
                </Modal.Body>
                <Modal.Footer>{card.rarity}</Modal.Footer>
            </Modal>);
        }
    }

    renderCollectionItems() {
        const {
            cards,
            categories,
            characters,
        } = this.state;

        return (<CollectionItems
            items={cards}
            categories={categories}
            onItemClick={(card) => {
                this.setState({
                    displayModal: true,
                    card,
                });
            }}
            defaultWidth={172}
            defaultHeight={250}
            filterableProperties={{
                rarity: {label: 'Rarity', values: ['★', '★★', '★★★', '★★★★', 'P', 'CP']},
                character: {label: 'Character', values: characters}
            }}
            groupBy={'series'}
            title={'Dragon Ball Heroes'}
            footer={'by hasiermetal'}
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

ReactDOM.render(React.createElement(() =>
    <DragonBallHeroesCollection
    />), window.DragonBallHeroesCollection);
