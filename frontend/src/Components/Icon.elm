module Components.Icon exposing (Coloring(..), Icon(..), MaterialIcon(..), ParetoIcon(..), view, viewWithSize)

import Color exposing (Color)
import FeatherIcons
import Graphics
import Html.Styled as Html exposing (Html, div)
import Html.Styled.Attributes exposing (css)
import Material.Icons
import Material.Icons.Outlined
import Material.Icons.Types
import Svg as UnstyledSvg
import Tailwind.Color as TwColor
import Tailwind.Theme as Theme
import Tailwind.Utilities as Tw


type Icon
    = FeatherIcon FeatherIcons.Icon
    | MaterialIcon MaterialIcon Int Coloring
    | ParetoIcon ParetoIcon Int Coloring
    | DummyIcon {}


type Coloring
    = Color Color
    | TailwindColor Theme.Color
    | Inherit


type MaterialIcon
    = MaterialBookmark
    | MaterialBookmarkAdd
    | MaterialBookmarkAdded
    | MaterialBookmarkBorder
    | MaterialCheck
    | MaterialFavorite
    | MaterialFavoriteBorder
    | MaterialInfo
    | MaterialOutlineBookmark
    | MaterialOutlineBookmarkAdd
    | MaterialOutlineBookmarkAdded
    | MaterialRepeat
    | MaterialRepeatOn


type ParetoIcon
    = ParetoCube
    | ParetoDove
    | ParetoFollowed
    | ParetoGlobe
    | ParetoGlobe2
    | ParetoPeaceDove
    | ParetoArt
    | ParetoMemes


view : Icon -> Html msg
view icon =
    case icon of
        FeatherIcon featherIcon ->
            featherIcon
                |> FeatherIcons.toHtml []
                |> Html.fromUnstyled

        MaterialIcon materialIcon size coloring ->
            viewMaterialIcon materialIcon size coloring

        ParetoIcon paretoIcon size coloring ->
            viewParetoIcon paretoIcon size coloring

        DummyIcon _ ->
            Html.text ""


viewWithSize : Int -> Icon -> Html msg
viewWithSize size icon =
    case icon of
        FeatherIcon featherIcon ->
            featherIcon
                |> FeatherIcons.withSize (toFloat size)
                |> FeatherIcons.toHtml []
                |> Html.fromUnstyled

        MaterialIcon materialIcon _ coloring ->
            viewMaterialIcon materialIcon size coloring

        ParetoIcon paretoIcon _ coloring ->
            viewParetoIcon paretoIcon size coloring

        DummyIcon _ ->
            Html.text ""


viewMaterialIcon : MaterialIcon -> Int -> Coloring -> Html msg
viewMaterialIcon materialIcon size coloring =
    let
        materialColoring =
            case coloring of
                Color color ->
                    Material.Icons.Types.Color color

                TailwindColor color ->
                    Material.Icons.Types.Color (colorFromTailwindColor color)

                Inherit ->
                    Material.Icons.Types.Inherit
    in
    svgForMaterialIcon materialIcon size materialColoring
        |> Html.fromUnstyled


svgForMaterialIcon : MaterialIcon -> (Int -> Material.Icons.Types.Coloring -> UnstyledSvg.Svg msg)
svgForMaterialIcon materialIcon =
    case materialIcon of
        MaterialBookmark ->
            Material.Icons.bookmark

        MaterialBookmarkAdd ->
            Material.Icons.bookmark_add

        MaterialBookmarkAdded ->
            Material.Icons.bookmark_added

        MaterialBookmarkBorder ->
            Material.Icons.bookmark_border

        MaterialCheck ->
            Material.Icons.check

        MaterialFavorite ->
            Material.Icons.favorite

        MaterialFavoriteBorder ->
            Material.Icons.favorite_border

        MaterialInfo ->
            Material.Icons.info

        MaterialOutlineBookmark ->
            Material.Icons.Outlined.bookmark_border

        MaterialOutlineBookmarkAdd ->
            Material.Icons.Outlined.bookmark_add

        MaterialOutlineBookmarkAdded ->
            Material.Icons.Outlined.bookmark_added

        MaterialRepeat ->
            Material.Icons.Outlined.repeat

        MaterialRepeatOn ->
            Material.Icons.Outlined.repeat_on


viewParetoIcon : ParetoIcon -> Int -> Coloring -> Html msg
viewParetoIcon paretoIcon size coloring =
    let
        coloredIcon =
            case coloring of
                Color color ->
                    \icon ->
                        div
                            [ css
                                [ Tw.text_color <| tailwindColorFromColor color ]
                            ]
                            [ icon ]

                TailwindColor color ->
                    \icon ->
                        div
                            [ css
                                [ Tw.text_color color ]
                            ]
                            [ icon ]

                Inherit ->
                    identity
    in
    svgForParetoIcon paretoIcon size
        |> coloredIcon


tailwindColorFromColor : Color -> Theme.Color
tailwindColorFromColor color =
    let
        rgba =
            Color.toRgba color

        oneToByte : Float -> Int
        oneToByte value =
            round (value * 255.0)
    in
    TwColor.arbitraryRgba (oneToByte rgba.red) (oneToByte rgba.green) (oneToByte rgba.blue) (rgba.alpha * 100.0)


colorFromTailwindColor : Theme.Color -> Color
colorFromTailwindColor color =
    case color of
        TwColor.Color "rgb" red green blue _ ->
            case ( String.toFloat red, String.toFloat green, String.toFloat blue ) of
                ( Just r, Just g, Just b ) ->
                    Color.fromRgba { red = r, green = g, blue = b, alpha = 1.0 }

                _ ->
                    Color.black

        TwColor.Color "rgba" red green blue TwColor.ViaVariable ->
            case ( String.toFloat red, String.toFloat green, String.toFloat blue ) of
                ( Just r, Just g, Just b ) ->
                    Color.fromRgba { red = r, green = g, blue = b, alpha = 1.0 }

                _ ->
                    Color.black

        TwColor.Color "rgba" red green blue (TwColor.Opacity opacity) ->
            case [ String.toFloat red, String.toFloat green, String.toFloat blue, String.toFloat opacity ] of
                [ Just r, Just g, Just b, Just o ] ->
                    Color.fromRgba { red = r, green = g, blue = b, alpha = o }

                _ ->
                    Color.black

        -- TODO: Handle keyword colors
        TwColor.Keyword _ ->
            Color.black

        _ ->
            Color.black

    
svgForParetoIcon : ParetoIcon -> (Int -> Html msg)
svgForParetoIcon paretoIcon =
    case paretoIcon of
        ParetoCube ->
            Graphics.paretoCube

        ParetoDove ->
            Graphics.dove

        ParetoFollowed ->
            Graphics.followedIcon

        ParetoGlobe ->
            Graphics.globeIcon

        ParetoGlobe2 ->
            Graphics.globe2Icon

        ParetoPeaceDove ->
            Graphics.peaceDove

        ParetoArt ->
            Graphics.artIcon

        ParetoMemes ->
            Graphics.memesIcon
