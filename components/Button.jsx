/**
 * @jsx React.DOM
 */
'use strict';

const StyleSheet = require('react-style');
const React = require('react');

const Button = React.createClass({
    getInitialState: function() {
        return {
            hover: false,
            focus: false
        }
    },
    render: function() {
        let props = this.props;
        let state = this.state;

        let styles = [
            ButtonStyles.normalStyle,
            props.active ? ButtonStyles.activeStyle : null,
            state.hover ? ButtonStyles.hoverStyle : null,
            state.focus ? ButtonStyles.focusStyle : null
        ].concat(props.styles);
        
        let _props = Object.assign({}, props, {
            styles: styles,
            onMouseEnter: () => this.setState({hover: true}),
            onMouseLeave: () => this.setState({hover: false}),
            onFocus: () => this.setState({focus: true}),
            onBlur: () => this.setState({focus: false})
        });

        let jsonifiedProps = JSON.stringify(_props);
        let propStore = <script id="props" type="application/json" dangerouslySetInnerHTML={{__html: jsonifiedProps}}></script>

        return (
            <div>
                <button {..._props}>
                    {_props.children}
                </button>
                <script src="/bundles/Button"/>
                {propStore}
            </div>
        );
    }
});


var ButtonStyles = StyleSheet.create({

    normalStyle: {
        backgroundColor: '#E6E6E6',
        border: 'none rgba(0, 0, 0, 0)',
        borderRadius: 3,
        color: 'rgba(0, 0, 0, 0.70)',
        cursor: 'pointer',
        display: 'inline-block',
        fontFamily: 'inherit',
        fontSize: '100%',
        lineHeight: 'normal',
        padding: '0.5em 1em',
        userSelect: 'none',
        textAlign: 'center',
        textDecoration: 'none',
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap',
        zoom: 1
    },

    activeStyle: {
        boxShadow: '0 0 0 1px rgba(0,0,0, 0.15) inset, 0 0 6px rgba(0,0,0, 0.20) inset'
    },

    hoverStyle: {
        color: '#000',
        backgroundImage: 'linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10))'
    },

    focusStyle: {
        backgroundImage: 'linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10))',
        outline: 'none'
    }

});

module.exports = Button;

if (typeof window !== 'undefined') {
    window.onload = function () {
        var container = document.getElementById('container');
        var props = JSON.parse(document.getElementById('props').innerHTML);
        React.render(React.createFactory(Button)(props), container);
    }
}