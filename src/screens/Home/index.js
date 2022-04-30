import React, { useEffect, useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ThemeContext } from 'styled-components';

import CustomButton from '../../componets/CustomButton';
import CustomScreen from '../../componets/CustomScreen';

import { Container, RowButtonArea } from './style';

export default () => {
    const [input, setInput] = useState('');
    const [displayInput, setDisplayInput] = useState('');
    const [prevNum, setPrevNum] = useState('');
    const [curNum, setCurNum] = useState('');
    const [operator, setOperator] = useState('');

    const { colors } = useContext(ThemeContext);

    useEffect(() => {
        const math_it_Up = {
            '+': function (x, y) {
                return x + y;
            },
            '-': function (x, y) {
                return x - y;
            },
            '*': function (x, y) {
                return x * y;
            },
            '/': function (x, y) {
                return x / y;
            },
        };

        if (curNum !== '') {
            if (operator !== '') {
                let solution = math_it_Up[operator](
                    parseFloat(prevNum),
                    parseFloat(curNum),
                );

                setInput(solution);
                setDisplayInput('');
                setOperator('');
                setCurNum('');
            }
        }
    }, [curNum, operator, prevNum]);

    const addPercentage = () => {
        setInput(input / 100);
    };

    const addPlusMinus = () => {
        if (input > 0) {
            setInput(-input);
        } else if (input < 0) {
            setInput(Math.abs(input));
        }
    };

    const addDecimalToInput = e => {
        if (input.indexOf('.') === -1) {
            setInput(input + e);
        }
    };

    const handleClear = () => {
        setInput('');
        setDisplayInput('');
        setPrevNum('');
        setCurNum('');
        setOperator('');
    };

    const handleBackspace = () => {
        setInput(input.slice(0, -1));
    };

    const solve = () => {
        setCurNum(input);
        setInput('');
    };

    function operation_Func(e) {
        setPrevNum(input);
        setDisplayInput(input + e)
        setInput('');
        setOperator(e);
    }

    const clickButton = e => {
        if (e === '+' || e === '-' || e === '/' || e === '*') {
            operation_Func(e);
        } else if (e === 'C') {
            handleClear();
        } else if (e === '+/-') {
            addPlusMinus();
        } else if (e === '%') {
            addPercentage();
        } else if (e === '.') {
            addDecimalToInput(e);
        } else if (e === 'backspace') {
            handleBackspace();
        } else if (e === '=') {
            solve();
        } else {
            setInput(input + e);
        }
    };

    return (
        <Container colors={[colors.primary, colors.secondary]} locations={[0, 0.8]}>
            <CustomScreen inputValue={displayInput} />
            <CustomScreen inputValue={input} />
            <RowButtonArea>
                <CustomButton
                    value="C"
                    color={colors.colorFunctionSecondary}
                    onPress={() => clickButton('C')}
                />
                <CustomButton
                    value="+/-"
                    color={colors.colorFunctionSecondary}
                    onPress={() => clickButton('+/-')}
                />
                <CustomButton
                    value={<Icon name="percentage" size={25} />}
                    color={colors.colorFunctionSecondary}
                    onPress={() => clickButton('%')}
                />
                <CustomButton
                    value={<Icon name="divide" size={25} />}
                    color={colors.colorFunctionPrimary}
                    onPress={() => clickButton('/')}
                />
            </RowButtonArea>

            <RowButtonArea>
                <CustomButton value="7" onPress={() => clickButton('7')} />
                <CustomButton value="8" onPress={() => clickButton('8')} />
                <CustomButton value="9" onPress={() => clickButton('9')} />
                <CustomButton
                    value={<Icon name="times" size={25} />}
                    color={colors.colorFunctionPrimary}
                    onPress={() => clickButton('*')}
                />
            </RowButtonArea>

            <RowButtonArea>
                <CustomButton value="4" onPress={() => clickButton('4')} />
                <CustomButton value="5" onPress={() => clickButton('5')} />
                <CustomButton value="6" onPress={() => clickButton('6')} />
                <CustomButton
                    value={<Icon name="minus" size={25} />}
                    color={colors.colorFunctionPrimary}
                    onPress={() => clickButton('-')}
                />
            </RowButtonArea>

            <RowButtonArea>
                <CustomButton value="1" onPress={() => clickButton('1')} />
                <CustomButton value="2" onPress={() => clickButton('2')} />
                <CustomButton value="3" onPress={() => clickButton('3')} />
                <CustomButton
                    value={<Icon name="plus" size={25} />}
                    color={colors.colorFunctionPrimary}
                    onPress={() => clickButton('+')}
                />
            </RowButtonArea>

            <RowButtonArea>
                <CustomButton value="0" onPress={() => clickButton('0')} />
                <CustomButton value="." onPress={() => clickButton('.')} />
                <CustomButton
                    value={<Icon name="backspace" size={25} />}
                    onPress={() => clickButton('backspace')}
                />
                <CustomButton
                    value={<Icon name="equals" size={25} />}
                    background={colors.backgroundEquals}
                    onPress={() => clickButton('=')}
                />
            </RowButtonArea>
        </Container>
    );
};