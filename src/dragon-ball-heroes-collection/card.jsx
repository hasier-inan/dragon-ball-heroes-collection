import './card.scss';
import PropTypes from 'prop-types';
import React from 'react';

const Card = (props) => {

    const {
        image,
        status,
        ability,
        battletype,
        unit,
    } = props;

    const renderUnit = () => {
        const unitIcons = unit.icon.map((value, index) => {
            return <img src={value} key={index} className={'card-unit__icon'}/>
        });

        return (<React.Fragment>
            <div className={'card-unit'}>

                <div className={'row'}>
                    <div className={'col-3 card-unit__icons text-center'}>{unitIcons}</div>
                    <div className={'col-9 card-unit__value'}>
                        <div>{unit.title}</div>
                        <div>{unit.value}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>);
    }

    const renderBattleType = () => {
        return (<React.Fragment>
            <div className={'card-battletype'}>
                <div className={'row card-battletype__title'}>{battletype.title}</div>
                <div className={'row'}>
                    <div className={'col'}>{battletype.type}</div>
                    <div className={'col'}>{battletype.typeValue}</div>
                </div>
                <div className={'row'}>{battletype.text}</div>
            </div>
            <div className={'card-separator'}></div>
        </React.Fragment>);
    }

    const renderAbility = () => {
        const cardAbilities = ability.map((value, index) => {
            return (<div className={'row card-ability'} key={index}>
                <div className={'col card-ability__icon'}>
                    <img src={value.icon}/>
                </div>
                <div className={'col-8 card-ability__title'}>
                    {value.name}
                </div>
                <p className={'card-ability__description'}>{value.text}</p>
            </div>);
        });
        if(cardAbilities.length > 0){
            return (<React.Fragment>
                {cardAbilities}
                <div className={'card-separator'}></div>
            </React.Fragment>);
        }
    }

    const renderCardStatus = () => {
        const cardStatusRows = ['HP', 'Power', 'Guard'].map((value, index) => {
            return (<div className='card-status' key={index}>
                <div className={`card-status-border card-status-border--top-${value.toLowerCase()}`}>{value}</div>
                <div
                    className={`card-status__value card-status--${value.toLowerCase()}`}>{status[value.toLowerCase()]}</div>
                <div className={`card-status-border card-status-border--bottom-${value.toLowerCase()}`}></div>
            </div>)
        });

        return (<React.Fragment>
            <div className='row'>{cardStatusRows}</div>
            <div className={'card-separator'}></div>
        </React.Fragment>);
    }

    return (<div className={'card-container'}>
        <div className='container'>
            <div className='row card'>
                <div className='col card__image'>
                    <img src={image}/>
                </div>
                <div className='col card__details'>
                    {renderCardStatus()}
                    {renderAbility()}
                    {renderBattleType()}
                </div>
            </div>
            <div className={'row card'}>
                {renderUnit()}
            </div>
        </div>
    </div>);
};

Card.propTypes = {
    'title': PropTypes.string.isRequired,
    'character': PropTypes.string.isRequired,
    'series': PropTypes.string.isRequired,
    'image': PropTypes.string.isRequired,
    'status': PropTypes.shape({
        'hp': PropTypes.string,
        'power': PropTypes.string,
        'guard': PropTypes.string,
    }).isRequired,
    'ability': PropTypes.array.isRequired,
    'battletype': PropTypes.shape({
        'title': PropTypes.string,
        'type': PropTypes.string,
        'typeValue': PropTypes.string,
        'text': PropTypes.string,
        'energy': PropTypes.string,
    }).isRequired,
    'unit': PropTypes.shape({
        'title': PropTypes.string,
        'value': PropTypes.string,
        'energy': PropTypes.string,
        'icon': PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

export default Card;