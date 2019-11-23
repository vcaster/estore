import React from 'react';
import Card from '../utils/card'

const CardBlockShop = (props) => {

    const renderCards = () => (
        props.list ?
            props.list.map(card =>(
                <Card
                    key={card._id}
                    {...card}
                    grid={props.grid}
                />
            ))
        :null
    )
    return (
        <div className="card_block_shop">
            <div className="">
                <div className="">
                    {props.list ?
                        props.list.length === 0 ?
                            <div className="no_results">
                                Sorry No Results
                            </div>
                        :null
                    :null}
                    {/* {console.log(props.list)} */}
                    { renderCards(props.list)}
                </div>
            </div>
        </div>
    );
};

export default CardBlockShop;