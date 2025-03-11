import PropTypes from 'prop-types';
import '../scss/results.scss';
import { AntDesignOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
        &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
        > span {
            position: relative;
        }
    
        &::before {
            content: '';
            background: linear-gradient(135deg, #6253e1, #04befe);
            position: absolute;
            inset: -1px;
            opacity: 1;
            transition: all 0.3s;
            border-radius: inherit;
        }
    
        &:hover::before {
            opacity: 0;
        }
        }
    `,
}));
function Results (props) {
    const { results, checkHandler } = props
    const { styles } = useStyle();

    return (
        <div className='results-container'>
            <div className='result-container'>
                {
                    results.map((result, idx) => (
                        result.length > 0 && (
                            <div key={`draw ${idx}`} className='draw-match-container'>
                                <h4>{`Draw ${idx}`}</h4>
                                {
                                    result.map((releaseMatch, idx) => (
                                        <div key={`release ${idx}`} className='release-match-container'>
                                            <p className='release-number'>{`${releaseMatch[0]}: `}</p>
                                            <p>{releaseMatch.slice(1).join(', ')}</p>
                                        </div>
                                    ))
                                } 
                            </div>
                        )
                    ))
                }
                <button type="button" onClick={checkHandler} className="check-button">
                    Check
                </button>
                {/* <ConfigProvider
                    button={{
                        className: styles.linearGradientButton,
                    }}
                    >
                    <Space>
                        <Button type="primary" size="large" icon={<AntDesignOutlined />}>
                        Gradient Button
                        </Button>
                        <Button size="large">Button</Button>
                    </Space>
                </ConfigProvider> */}
            </div>
        </div>
    )
}



Results.propTypes = {
    results: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))).isRequired,
    checkHandler: PropTypes.func
}

export default Results