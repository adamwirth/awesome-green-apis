import { Card, Grid, Heading, useTheme, View, ToggleButton, ToggleButtonGroup, ColorMode, Message, Flex } from '@aws-amplify/ui-react';
import { useContext, useState } from 'react';
import { ColorModeContext } from '../dark_mode';
import { InfoIcon, SunIcon, MoonIcon, GithubIcon } from './icons';
import { AlphaBadge } from '../utils/constants/badges';

export type VisualizationType = 'cscale' | 'firststreet' | 'third thing';

interface DashboardHeaderProps {
    onViewChange: (view: VisualizationType) => void;
    currentView: VisualizationType;
}

const Header = ({ onViewChange, currentView }: DashboardHeaderProps) => {
    const { tokens } = useTheme();
    const [showInfo, setShowInfo] = useState('');
    const { colorMode, setColorMode } = useContext(ColorModeContext);

    return (
        <>
            <Card
                as="nav"
                variation="elevated">
                <Grid
                    gap={tokens.space.xs}
                    templateColumns={{ base: "auto", medium: "2fr 1fr auto" }}
                    padding={tokens.space.small}
                    style={{ justifyItems: 'stretch' }}
                >
                    <Flex style={{ alignItems: 'center' }}>
                        <Flex style={{ alignItems: 'center', gap: '0.5rem' }}>
                            <Flex style={{alignItems: 'center' }}>
                                <Heading
                                    level={3}
                                    fontSize={tokens.fontSizes.xxl}
                                    style={{
                                        margin: 0,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    Example Charts
                                </Heading>
                                <AlphaBadge />
                            </Flex>


                            <Flex>
                                <View
                                    onClick={() => setShowInfo(' show')}
                                    onMouseEnter={() => setShowInfo(' show')}
                                    onMouseLeave={() => setShowInfo('')}
                                    style={{ cursor: "pointer" }}
                                >
                                    <InfoIcon fill={tokens.colors.font.info.toString()} />
                                </View>
                                <Message
                                    className={"info-message" + showInfo}
                                    heading="Note"
                                    role="note"
                                    variation="outlined"
                                    colorTheme="info"
                                    hasIcon={false}
                                >
                                    This dashboard uses generated data for demonstration purposes only.
                                    It serves as an example of what an API dashboard could look like with real data.
                                </Message>
                            </Flex>
                        </Flex>
                    </Flex>

                    <ToggleButtonGroup
                        value={currentView}
                        isExclusive
                        onChange={(value) => onViewChange(value as VisualizationType)}
                        size="large"
                        minHeight={44}
                    >
                        <ToggleButton
                            value="cscale"
                            ariaLabel="CScale view">
                            CScale
                        </ToggleButton>
                        <ToggleButton
                            value="firststreet"
                            ariaLabel="FirstStreet view">
                            FirstStreet
                        </ToggleButton>
                        <ToggleButton
                            value="third thing"
                            ariaLabel="Third thing"
                            disabled>
                            Third Thing
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <Flex
                        aria-hidden="true"
                        style={{
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <ToggleButtonGroup
                            value={colorMode}
                            isExclusive
                            onChange={(value) => setColorMode(value as ColorMode)}
                            size="large"
                            minHeight={44}
                        >
                            <ToggleButton
                                value="light"
                                ariaLabel="light mode">
                                <SunIcon fill={tokens.colors.background.quaternary.toString()} />
                            </ToggleButton>
                            <ToggleButton
                                defaultPressed
                                value="dark"
                                ariaLabel="dark mode">
                                <MoonIcon fill={tokens.colors.background.quaternary.toString()} />
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <a
                            href="https://github.com/adamowirth/awesome-green-apis"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '0.5rem'
                            }}
                        >
                            <GithubIcon fill={tokens.colors.background.quaternary.toString()} />
                        </a>
                    </Flex>
                </Grid>
            </Card>
        </>
    );
};

export default Header;
