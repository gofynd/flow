import { getPageSlug } from 'fdk-core/utils';

export async function globalDataResolver({ fpi,applicationID  }) {
    return Promise.all([
        fpi.configuration.fetchApplication(),
        fpi.content.fetchLandingPage(),
        fpi.content.fetchAppSeo(),
        fpi.content?.fetchTags(),
        fpi.content?.fetchNavigation({}),
        fpi.auth?.fetchPlatformData({id:applicationID}),
    ]).catch(console.log);

}

export async function pageDataResolver({ fpi, router, themeId }) {
    const state = fpi.store.getState();
    const pageValue = getPageSlug(router);
    const APIs = [  ]
    const currentPageInStore = state?.theme?.page?.value ?? null;

    console.log('Page Data resolver called with : ', { fpi, router, state, pageValue, currentPageInStore, themeId });
    
    if (  pageValue && pageValue !== currentPageInStore ) {
        APIs.push(
            fpi.theme.fetchPage({
                pageValue,
                themeId,
            }).then(console.log)
        )
    }
    return Promise.all(APIs).catch(console.log);
}