module Nostr.Relay exposing (..)

import Dict exposing (Dict)
import Http
import Json.Decode as Decode
import Nostr.Nip11 exposing (Nip11Info)
import Nostr.Types exposing (RelayUrl)
import Url


type alias Relay =
    { urlWithoutProtocol : String
    , state : RelayState
    , nip11 : Maybe Nip11Info
    }


type RelayState
    = RelayStateUnknown
    | RelayStateNip11RequestFailed Http.Error
    | RelayDisconnected
    | RelayConnecting
    | RelayConnected
    | RelayReady


displayName : Relay -> String
displayName relay =
    relay.nip11
        |> Maybe.andThen .name
        |> Maybe.withDefault relay.urlWithoutProtocol


iconUrl : Relay -> String
iconUrl relay =
    relay.nip11
        |> Maybe.andThen .icon
        |> Maybe.withDefault ("https://" ++ hostWithoutProtocol relay.urlWithoutProtocol ++ "/favicon.ico")


websocketUrl : String -> String
websocketUrl urlWithoutProtocol =
    if not (String.startsWith "wss://" urlWithoutProtocol || String.startsWith "ws://" urlWithoutProtocol) then
        "wss://" ++ urlWithoutProtocol

    else
        urlWithoutProtocol


relayUrlDecoder : Decode.Decoder RelayUrl
relayUrlDecoder =
    Decode.field "url" Decode.string
        |> Decode.andThen
            (\relayUrl ->
                Decode.succeed <| hostWithoutProtocol relayUrl
            )


updateRelayStatus : String -> RelayState -> Dict String Relay -> Dict String Relay
updateRelayStatus relayUrlWithoutProtocol state relayDict =
    case Dict.get relayUrlWithoutProtocol relayDict of
        Just relay ->
            Dict.insert relayUrlWithoutProtocol { relay | state = state } relayDict

        Nothing ->
            Dict.insert
                relayUrlWithoutProtocol
                { urlWithoutProtocol = relayUrlWithoutProtocol
                , state = state
                , nip11 = Nothing
                }
                relayDict


updateRelayNip11 : String -> Nip11Info -> List Relay -> List Relay
updateRelayNip11 urlWithoutProtocol info relays =
    List.map
        (\relay ->
            if relay.urlWithoutProtocol == urlWithoutProtocol then
                { relay | nip11 = Just info }

            else
                relay
        )
        relays


hostWithoutProtocol : String -> String
hostWithoutProtocol url =
    let
        urlWithoutProtocol =
            if String.startsWith "wss://" url then
                String.dropLeft 6 url

            else if String.startsWith "ws://" url then
                String.dropLeft 5 url

            else
                url
    in
    if String.endsWith "/" urlWithoutProtocol then
        String.dropRight 1 urlWithoutProtocol

    else
        urlWithoutProtocol


hostAndPathOfUrl : String -> ( Maybe String, Maybe String )
hostAndPathOfUrl urlString =
    case Url.fromString urlString of
        Just url ->
            ( Just url.host, Just url.path )

        Nothing ->
            ( Nothing, Nothing )
