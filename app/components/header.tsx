import { Card, Grid, Heading, useTheme, View, ToggleButton, ToggleButtonGroup, ColorMode, Message } from '@aws-amplify/ui-react';
import { useContext, useState } from 'react';
import { ColorModeContext } from '@/app/dark_mode';
import { InfoIcon, SunIcon, MoonIcon, GithubIcon } from './icons';
import { AlphaBadge } from '@/app/utils/constants/badges';

export type VisualizationType = 'cscale' | 'firststreet' | 'third thing';

interface DashboardHeaderProps {
    onViewChange: (view: VisualizationType) => void;
    currentView: VisualizationType;
}

const Header = ({ onViewChange, currentView }: DashboardHeaderProps) => {
    const { tokens } = useTheme();
    const [showInfo, setShowInfo] = useState(false);
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
                >
                    <View display="inline-flex">
                        <View display="inline-flex" style={{ alignItems: 'center', position: 'relative' }}>
                            <Heading
                                level={3}
                                fontSize={tokens.fontSizes.xxl}
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                Example Charts
                            </Heading>

                            <View
                                marginLeft={tokens.space.medium}
                                onClick={() => setShowInfo(true)}
                                onMouseEnter={() => setShowInfo(true)}
                                onMouseLeave={() => setShowInfo(false)}
                                style={{ cursor: "pointer" }}
                            >
                                <InfoIcon fill={tokens.colors.font.info.toString()} />
                            </View>
                            <Message
                                className="info-message"
                                marginLeft="1rem"
                                heading="Note"
                                role="note"
                                variation="outlined"
                                colorTheme="info"
                                position="absolute"
                                left="100%"
                                top="0"
                                width="400px"
                                hasIcon={false}
                                style={{
                                    opacity: showInfo ? 1 : 0,
                                    visibility: showInfo ? 'visible' : 'hidden',
                                    transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
                                    zIndex: 100
                                }}
                            >
                                This dashboard uses generated data for demonstration purposes only.
                                It serves as an example of what an API dashboard could look like with real data.
                            </Message>
                            <AlphaBadge />
                        </View>
                    </View>

                    {/* Visualization Toggle Buttons
                    TODO currently does a little shuffling on loading 
                    */}
                    <View
                        display="flex"
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
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
                            {/* todo dynamically extract in compiled way */}
                            <ToggleButton
                                value="third thing"
                                ariaLabel="Third thing"
                                disabled>
                                Third Thing
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </View>

                    {/* Theme Toggle and GitHub Link */}
                    <View
                        aria-hidden="true"
                        display="flex"
                        style={{
                            alignItems: 'center',
                            justifyContent: 'flex-end',
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
                    </View>
                </Grid>
            </Card>
        </>
    );
};

export default Header;
