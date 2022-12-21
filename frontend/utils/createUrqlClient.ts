import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import {
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from "urql";
import { pipe, tap } from "wonka";

import { LoginMutation, LogoutMutation, MeDocument, MeQuery, CreateCompanyMutation } from "../generated/graphql";

import Router from "next/router";
import gql from "graphql-tag";
import { isServer } from "./isServer";
import { betterUpdateQuery } from './betterUpdateQuery';

const errorExchange: Exchange = ({ forward }) => (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/login");
        }
      })
    );
  };
  
  export const createUrqlClient = (ssrExchange: any, ctx: any) => {
    let cookie = "";
    if (isServer()) {
      cookie = ctx?.req?.headers?.cookie;
    }
  
    return {
      url: process.env.NEXT_PUBLIC_API_URL as string,
      fetchOptions: {
        credentials: "include" as const,
        headers: cookie
          ? {
              cookie,
            }
          : undefined,
      },
      exchanges: [
        dedupExchange,
        cacheExchange({
          keys: {
        
          },
          resolvers: {
            Query: {
                
            },
          },
          updates: {
            Mutation: {

              logout: (_result, args, cache, info) => {
                betterUpdateQuery<LogoutMutation, MeQuery>(
                  cache,
                  { query: MeDocument },
                  _result,
                  () => ({ me: null })
                );
              },
              login: (_result, args, cache, info) => {
                betterUpdateQuery<LoginMutation, MeQuery>(
                  cache,
                  { query: MeDocument },
                  _result,
                  (result, query) => {
                    if (result.login.errors) {
                      return query;
                    } else {
                      return {
                        me: result.login.user,
                      };
                    }
                  }
                );
               
              },
              register: (_result, args, cache, info) => {
                betterUpdateQuery<CreateCompanyMutation, MeQuery>(
                  cache,
                  { query: MeDocument },
                  _result,
                  (result, query) => {
                    if (result.createCompany.errors) {
                      return query;
                    } else {
                      return {
                        me: result.createCompany.user,
                      };
                    }
                  }
                );
              },
            },
          },
        }),
        errorExchange,
        ssrExchange,
        fetchExchange,
      ],
    };
  };