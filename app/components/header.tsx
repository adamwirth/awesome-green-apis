import { Card, ColorMode, Flex, Grid, Heading, Message, ToggleButton, ToggleButtonGroup, useTheme, View } from '@aws-amplify/ui-react';
import { useContext, useState } from 'react';

import { ColorModeContext } from '../dark_mode';
import { AlphaBadge } from '../utils/constants/badges';
import { GithubIcon, InfoIcon, MoonIcon, SunIcon } from './icons';

export type VisualizationType = 'cscale' | 'firststreet';

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
                    <Flex>
                        <Flex style={{ alignItems: 'center' }} gap={tokens.space.xs} >
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

                    <ToggleButtonGroup
                        value={currentView}
                        isExclusive
                        onChange={(value) => onViewChange(value as VisualizationType)}
                        size="large"
                        minHeight={44}
                    >
                        <ToggleButton
                            value="firststreet"
                            ariaLabel="FirstStreet view">
                            FirstStreet
                        </ToggleButton>
                        <ToggleButton
                            value="cscale"
                            ariaLabel="CScale view">
                            CScale
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <Flex
                        aria-hidden="true"
                        alignItems="center"
                        gap={tokens.space.xs}
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
                                marginLeft: Number(tokens.space.xs)
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
