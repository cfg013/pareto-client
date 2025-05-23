module Components.Button exposing
    ( Button, new
    , view
    , withStyleSuccess, withStyleWarning, withStyleDanger
    , withSizeSmall
    , withIconLeft, withIconRight
    , withDisabled
    , withHidden, withLink, withTypePrimary, withTypeSecondary
    , withIntermediateState
    )

{-|


## Basic usage

@docs Button, new
@docs view


## Modifiers

@docs withStyleSuccess, withStyleWarning, withStyleDanger
@docs withSizeSmall
@docs withIconLeft, withIconRight
@docs withDisabled

-}

import Components.Icon exposing (Icon)
import Css
import Html.Styled as Html exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events as Events
import Tailwind.Utilities as Tw
import Ui.Shared exposing (emptyHtml)
import Ui.Styles exposing (darkMode)
import Svg.Loaders



-- SETTINGS


type Button msg
    = Settings
        { label : String
        , onClick : Maybe msg
        , link : Maybe String
        , style : Style
        , size : Size
        , type_ : ButtonType
        , iconLeft : Maybe Icon
        , iconRight : Maybe Icon
        , isOutlined : Bool
        , isDisabled : Bool
        , isHidden : Bool
        , isInIntermediateState : Bool
        , theme : Ui.Styles.Theme
        }


new : { label : String, onClick : Maybe msg, theme : Ui.Styles.Theme } -> Button msg
new props =
    Settings
        { label = props.label
        , onClick = props.onClick
        , link = Nothing
        , style = Default
        , size = Normal
        , type_ = RegularButton
        , iconLeft = Nothing
        , iconRight = Nothing
        , isOutlined = False
        , isDisabled = False
        , isHidden = False
        , isInIntermediateState = False
        , theme = props.theme
        }



-- MODIFIERS


withLink : Maybe String -> Button msg -> Button msg
withLink link (Settings settings) =
    Settings { settings | link = link }


type ButtonType
    = RegularButton
    | PrimaryButton
    | SecondaryButton


withTypePrimary : Button msg -> Button msg
withTypePrimary (Settings settings) =
    Settings { settings | type_ = PrimaryButton }


withTypeSecondary : Button msg -> Button msg
withTypeSecondary (Settings settings) =
    Settings { settings | type_ = SecondaryButton }


type Style
    = Default
    | Success
    | Warning
    | Danger


withStyleSuccess : Button msg -> Button msg
withStyleSuccess (Settings settings) =
    Settings { settings | style = Success }


withStyleWarning : Button msg -> Button msg
withStyleWarning (Settings settings) =
    Settings { settings | style = Warning }


withStyleDanger : Button msg -> Button msg
withStyleDanger (Settings settings) =
    Settings { settings | style = Danger }


type Size
    = Normal
    | Small


withSizeSmall : Button msg -> Button msg
withSizeSmall (Settings settings) =
    Settings { settings | size = Small }


withIconLeft : Icon -> Button msg -> Button msg
withIconLeft icon (Settings settings) =
    Settings { settings | iconLeft = Just icon }


withIconRight : Icon -> Button msg -> Button msg
withIconRight icon (Settings settings) =
    Settings { settings | iconRight = Just icon }


withDisabled : Bool -> Button msg -> Button msg
withDisabled isDisabled (Settings settings) =
    Settings { settings | isDisabled = isDisabled }


withHidden : Bool -> Button msg -> Button msg
withHidden isHidden (Settings settings) =
    Settings { settings | isHidden = isHidden }


withIntermediateState : Bool -> Button msg -> Button msg
withIntermediateState isIntermediateState (Settings settings) =
    Settings { settings | isInIntermediateState = isIntermediateState }



-- VIEW


view : Button msg -> Html msg
view (Settings settings) =
    let
        buttonStyles =
            stylesForTheme (Settings settings)

        viewOptionalIcon : Maybe Icon -> Html msg
        viewOptionalIcon maybeIcon =
            case maybeIcon of
                Just icon ->
                    Components.Icon.view icon

                Nothing ->
                    text ""

        viewIntermediateStateIndicator : Html msg
        viewIntermediateStateIndicator =
            if settings.isInIntermediateState then
                div [ css [ Tw.flex, Tw.items_center, Tw.justify_center ] ]
                    [ Svg.Loaders.puff [ Svg.Loaders.size 16, Svg.Loaders.color "currentColor" ]
                        |> Html.fromUnstyled
                    ]

            else
                emptyHtml

        ( element, onClickAttr ) =
            case ( settings.isDisabled || settings.isInIntermediateState, settings.onClick, settings.link ) of
                ( False, Just onClick, _ ) ->
                    ( button, [ Events.onClick onClick ] )

                ( False, Nothing, Just link ) ->
                    ( a, [ href link ] )

                ( _, _, _ ) ->
                    ( div, [ disabled True ] )
    in
    if not settings.isHidden then
        div
            [ css
                [ Tw.flex
                , Tw.flex_row
                , Tw.gap_2
                ]
            ]
            [ element
                (buttonStyles
                    ++ onClickAttr
                    ++ [ css
                            [ Tw.py_2
                            , Tw.px_4
                            , Tw.flex
                            , Tw.flex_row
                            , Tw.gap_2
                            , Tw.rounded_full
                            , Css.hover
                                []
                            ]
                       , classList
                            [ ( "is-success", settings.style == Success )
                            , ( "is-warning", settings.style == Warning )
                            , ( "is-danger", settings.style == Danger )
                            , ( "is-small", settings.size == Small )
                            ]
                       ]
                )
                [ viewOptionalIcon settings.iconLeft
                , text settings.label
                , viewOptionalIcon settings.iconRight
                , viewIntermediateStateIndicator 
                ]
            ]

    else
        emptyHtml


stylesForTheme : Button msg -> List (Attribute msg)
stylesForTheme (Settings settings) =
    let
        styles =
            Ui.Styles.stylesForTheme settings.theme

        -- TODO: use style (Default | Success | Warning | Danger)
        ( foregroundStyles, backgroundStyles ) =
            case settings.type_ of
                RegularButton ->
                    if settings.isDisabled then
                        ( [ Tw.text_color styles.color2, darkMode [ Tw.text_color styles.color2DarkMode ] ]
                        , [ Tw.bg_color styles.color1, darkMode [ Tw.bg_color styles.color1DarkMode ] ]
                        )

                    else
                        ( [ Tw.text_color styles.color1, darkMode [ Tw.text_color styles.color1DarkMode ] ]
                        , [ Tw.bg_color styles.color4
                          , Tw.border_color styles.color1
                          , darkMode [ Tw.bg_color styles.color4DarkMode, Tw.border_color styles.color1DarkMode ]
                          ]
                        )

                PrimaryButton ->
                    if settings.isDisabled then
                        ( [ Tw.text_color styles.color2, darkMode [ Tw.text_color styles.color2DarkMode ] ]
                        , [ Tw.bg_color styles.color1, darkMode [ Tw.bg_color styles.color1DarkMode ] ]
                        )

                    else
                        ( [ Tw.text_color styles.color1, darkMode [ Tw.text_color styles.color1DarkMode ] ]
                        , [ Tw.bg_color styles.color4, darkMode [ Tw.bg_color styles.color4DarkMode ] ]
                        )

                SecondaryButton ->
                    if settings.isDisabled then
                        ( [ Tw.text_color styles.color2, darkMode [ Tw.text_color styles.color2DarkMode ] ]
                        , [ Tw.bg_color styles.color1, darkMode [ Tw.bg_color styles.color1DarkMode ] ]
                        )

                    else
                        ( [ Tw.text_color styles.color1, darkMode [ Tw.text_color styles.color1DarkMode ] ]
                        , [ Tw.bg_color styles.color3, darkMode [ Tw.bg_color styles.color3DarkMode ] ]
                        )
    in
    [ css (foregroundStyles ++ backgroundStyles) ]
