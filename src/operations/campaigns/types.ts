import * as t from 'io-ts'

import { ResponseStatus, ListPagination, createEnumType } from '../commons/types'
import { DateFromNumber } from 'io-ts-types/lib/DateFromNumber'
import { PortfolioId } from '../portfolios/types'

/**
 * The ID of the campaign.
 */
export const CampaignId = t.number
export type CampaignId = t.TypeOf<typeof CampaignId>

/**
 * The name of the campaign.
 */
export const CampaignName = t.string
export type CampaignName = t.TypeOf<typeof CampaignName>

/**
 * Specifies the advertising product managed by this campaign.
 */
export enum CampaignTypeEnum {
  SPONSORED_PRODUCTS = 'sponsoredProducts',
}

export const CampaignType = createEnumType<CampaignTypeEnum>(CampaignTypeEnum)
export type CampaignType = t.TypeOf<typeof CampaignType>

/**
 * Differentiates between a keyword-targeted and automatically targeted campaign.
 */
export enum CampaignTargetingEnum {
  MANUAL = 'manual',
  AUTO = 'auto',
}

export const CampaignTargetingType = createEnumType<CampaignTargetingEnum>(CampaignTargetingEnum)
export type CampaignTargetingType = t.TypeOf<typeof CampaignTargetingType>

/**
 * Advertiser-specified state of the campaign.
 */

export enum CampaignStateEnum {
  ENABLED = 'enabled',
  PAUSED = 'paused',
  ARCHIVED = 'archived',
}

export const CampaignStateType = createEnumType<CampaignStateEnum>(CampaignStateEnum)
export type CampaignStateType = t.TypeOf<typeof CampaignStateType>

export const Campaign = t.partial({
  /**
   * The ID of the portfolio.
   */
  portfolioId: PortfolioId,

  /**
   * The ID of the campaign.
   */
  campaignId: CampaignId,

  /**
   * The name of the campaign.
   */
  name: CampaignName,

  /**
   * Specifies the advertising product managed by this campaign.
   */
  campaignType: CampaignType,

  /**
   * Differentiates between a keyword-targeted and automatically targeted campaign.
   */
  targetingType: CampaignTargetingType,

  /**
   * The state of the campaign.
   */
  state: CampaignStateType,

  /**
   * Daily budget for the campaign.
   */
  dailyBudget: t.number,

  /**
   * The date the campaign will go or went live as YYYYMMDD.
   */
  startDate: t.string,

  /**
   * The optional date the campaign will stop running as YYYYMMDD.
   */
  endDate: t.string,

  /**
   * When enabled, Amazon will increase the default bid for your ads that are eligible to appear in this placement. See developer notes for more information.
   */
  premiumBidAdjustment: t.boolean,
})
export type Campaign = t.TypeOf<typeof Campaign>

export const SponsoredProductsCampaignCreateParams = t.intersection([
  t.type({
    /**
     * Campaign name limit is 128 characters.
     * Duplicate campaign names are not allowed. Campaigns with zero positive keywords are not allowed.
     */
    name: CampaignName,

    campaignType: CampaignType,

    /**
     * Differentiates between a keyword-targeted and automatically targeted campaign.
     */
    targetingType: CampaignTargetingType,

    /**
     * The state of the campaign.
     */
    state: CampaignStateType,

    /**
     * Daily budget for the campaign.
     */
    dailyBudget: t.number,

    /**
     * The date the campaign will go or went live as YYYYMMDD.
     */
    startDate: t.string,
  }),

  t.partial({}),
])
export type SponsoredProductsCampaignCreateParams = t.TypeOf<
  typeof SponsoredProductsCampaignCreateParams
>

export const SponsoredProductsCampaignUpdateParams = t.intersection([
  t.type({
    /**
     * The ID of the campaign.
     */
    campaignId: CampaignId,
  }),
  t.partial({
    /**
     * The ID of the portfolio.
     */
    portfolioId: PortfolioId,
    /**
     * Campaign name limit is 128 characters.
     * Duplicate campaign names are not allowed. Campaigns with zero positive keywords are not allowed.
     */
    name: CampaignName,
    /**
     * Advertiser-specified state of the campaign.
     */
    state: CampaignStateType,
    /**
     * Daily budget for the campaign.
     */
    dailyBudget: t.number,
    /**
     * startDate must be today or in the future. Format YYYYMMDD. If startDate is not set, it will be the current date by default.
     */
    startDate: t.string,

    /**
     * endDate must be greater than startDate. Format YYYYMMDD.
     * If endDate is not set, campaign will run forever. endDate must be used with startDate. endDate is required for lifetime budget option.
     */
    endDate: t.string,
    /**
     * When enabled, Amazon will increase the default bid for your ads that are eligible to appear in this placement. See developer notes for more information.
     */
    premiumBidAdjustment: t.boolean,
  }),
])

export type SponsoredProductsCampaignUpdateParams = t.TypeOf<
  typeof SponsoredProductsCampaignUpdateParams
>

export const SponsoredBrandsCampaignUpdateParams = t.intersection([
  t.type({
    /**
     * The ID of the campaign.
     */
    campaignId: CampaignId,
  }),
  t.partial({
    /**
     * The ID of the portfolio.
     */
    portfolioId: PortfolioId,

    /**
     * The Budget of the campaign.
     */
    budget: t.number,

    /**
     * endDate must be greater than startDate. Format YYYYMMDD.
     * If endDate is not set, campaign will run forever. endDate must be used with startDate. endDate is required for lifetime budget option.
     */
    endDate: t.string,

    /**
     * Advertiser-specified state of the campaign.
     */
    state: CampaignStateType,

    /**
     * Allow Amazon to automatically optimize bids for placements below top of search.
     */
    bidOptimization: t.boolean,

    /**
     * Should only be set when 'bidOptimization' is set to false. Value is a percentage with two decimal places and range is -99 to +99.99. Example: A -30.00 decrease on a $5.00 bid will become $3.00.
     */
    bidMultiplier: t.number,
  }),
])

export type SponsoredBrandsCampaignUpdateParams = t.TypeOf<
  typeof SponsoredBrandsCampaignUpdateParams
>

/**
 * The computed status, accounting for campaign out of budget, policy violations, etc. See developer notes for more information.
 */
export enum CampaignServingStatusEnum {
  CAMPAIGN_ARCHIVED = 'CAMPAIGN_ARCHIVED',
  CAMPAIGN_PAUSED = 'CAMPAIGN_PAUSED',
  CAMPAIGN_STATUS_ENABLED = 'CAMPAIGN_STATUS_ENABLED',
  ADVERTISER_PAYMENT_FAILURE = 'ADVERTISER_PAYMENT_FAILURE',
  CAMPAIGN_OUT_OF_BUDGET = 'CAMPAIGN_OUT_OF_BUDGET',
  ACCOUNT_OUT_OF_BUDGET = 'ACCOUNT_OUT_OF_BUDGET',
  PORTFOLIO_ENDED = 'PORTFOLIO_ENDED', // The docs don't say about this type
  CAMPAIGN_INCOMPLETE = 'CAMPAIGN_INCOMPLETE',
}

export const CampaignServingStatusType = createEnumType<CampaignServingStatusEnum>(
  CampaignServingStatusEnum,
)
export type CampaignServingStatusType = t.TypeOf<typeof CampaignServingStatusType>

export const CampaignExtended = t.intersection([
  Campaign,
  t.partial({
    /**
     * Ad placement. Only returned when segment is set to placement.
     */
    placement: t.union([t.literal('Top of Search on-Amazon'), t.literal('Other on-Amazon')]),

    /**
     * The date the campaign was created as epoch time in milliseconds.
     */
    creationDate: DateFromNumber,

    /**
     * The date the campaign was created as epoch time in milliseconds.
     */
    lastUpdatedDate: DateFromNumber,

    /**
     * The computed status, accounting for campaign out of budget, policy violations, etc. See developer notes for more information.
     */
    servingStatus: CampaignServingStatusType,
  }),
])
export type CampaignExtended = t.TypeOf<typeof CampaignExtended>

export const SponsoredBrandsCampaign = t.strict({
  /**
   * The ID of the portfolio.
   */
  portfolioId: PortfolioId,

  /**
   * The ID of the campaign.
   */
  campaignId: t.readonly(CampaignId),

  /**
   * Campaign name limit is 128 characters.
   * Duplicate campaign names are not allowed. Campaigns with zero positive keywords are not allowed.
   */
  name: CampaignName,

  /**
   * The Budget of the campaign.
   */
  budget: t.number,

  /**
   * Lifetime budget type requires startDate and endDate specified.
   * For most marketplaces, lifetime budget range is 100 to 20,000,000, and daily budget range is 1 to 1,000,000 by default.
   * For JP marketplace, lifetime budget range is 10,000 to 2,000,000,000, and daily budget range is 100 to 21,000,000.
   */
  budgetType: t.union([t.literal('lifetime'), t.literal('daily')]),

  /**
   * startDate must be today or in the future. Format YYYYMMDD. If startDate is not set, it will be the current date by default.
   */
  startDate: t.string,

  /**
   * endDate must be greater than startDate. Format YYYYMMDD.
   * If endDate is not set, campaign will run forever. endDate must be used with startDate. endDate is required for lifetime budget option.
   */
  endDate: t.string,

  /**
   * The state of the campaign.
   */
  state: CampaignStateType,

  /**
   * asinNotBuyable: associated ASIN cannot be purchased due to eligibility or availability.
   * billingError: billing information needs correction.
   * ended: specified endDate in campaign object has passed.
   * landingPageNotAvailable: associated landing page is not available (e.g. page path no longer exists) or valid (must have 3 valid ASINs on landing page).
   * outOfBudget: campaign has run out of budget.
   * paused: campaign state set to paused by the user.
   * pendingReview: default status after campaign creation, cleared once moderation review has occurred, which completes within 72 hours.
   * ready: the campaign is scheduled for a future date.
   * rejected: moderation denied campaign approval.
   * running: campaign is enabled and serving.
   * scheduled: a transitive state between ready and running, where serving has not begun as child entities move to running state.
   * terminated: campaign is deleted.
   */
  servingStatus: t.readonly(
    t.union([
      t.literal('asinNotBuyable'),
      t.literal('billingError'),
      t.literal('ended'),
      t.literal('landingPageNotAvailable'),
      t.literal('outOfBudget'),
      t.literal('paused'),
      t.literal('pendingReview'),
      t.literal('ready'),
      t.literal('rejected'),
      t.literal('running'),
      t.literal('scheduled'),
      t.literal('terminated'),
    ]),
  ),

  /**
   * Required for sellers. brandEntityId is defined in the seller profile. Used in campaign creation and asset registration.
   */
  brandEntityId: t.string,

  /**
   * Allow Amazon to automatically optimize bids for placements below top of search.
   * Default to true if not set in campaign creation request.
   */
  bidOptimization: t.boolean,

  /**
   * This field can be set when 'bidOptimization' is set to false. Value is a percentage with two decimal places and range is -99.00 to +99.99.
   * Example: A -30.00 decrease on a $5.00 bid will become $3.00.
   */
  bidMultiplier: t.number,

  creative: t.strict({
    /**
     * Name of brand to be displayed. Max length 30 characters.
     */
    brandName: t.string,

    /**
     * Asset ID of brand logo in Store Assets Library.
     * If the campaigns were created in advertising console before Store Assets Library launch, the brandLogoAssetID will not be populated in the API response.
     */
    brandLogoAssetID: t.string,

    /**
     * URL of the hosted image. This is a readOnly field returned in the response.
     */
    brandLogoUrl: t.readonly(t.string),

    /**
     * Headline text. Max length 50 characters, except JP market, which is maxlength 35 characters.
     */
    headline: t.string,

    /**
     * List of ASINs shown on the creative. Min 0, max 3
     */
    asins: t.array(t.string),
  }),

  /**
   * Landing page type is required. The presence of other fields depends on the landing page type. This property may not be modified after campaign creation.
   */
  landingPage: t.union([t.literal('productList'), t.literal('store'), t.literal('customUrl')]),

  keywords: t.intersection([
    t.strict({
      /**
       * The text for the positive or negative keyword. Maximum length is ten words.
       */
      keywordText: t.string,

      /**
       * The match type for the positive or negative keyword.
       */
      matchType: t.union([t.literal('broad'), t.literal('exact'), t.literal('phrase')]),
    }),
    t.partial({
      /**
       * Market threshold specifics can be found at our external docs page, under Supported Features > Keyword bid constraints by marketplace.
       * Bid should not be larger than budget.
       */
      bid: t.number,
    }),
  ]),
})
export type SponsoredBrandsCampaign = t.TypeOf<typeof SponsoredBrandsCampaign>

export const CampaignResponse = t.intersection([
  t.type({
    /**
     * The ID of the campaign.
     */
    campaignId: CampaignId,

    /**
     * An enumerated success or error code for machine use.
     */
    code: t.string,
  }),
  t.partial({
    /**
     * A human-readable description of the error, if unsuccessful.
     */
    details: t.string,
  }),
])
export type CampaignResponse = t.TypeOf<typeof CampaignResponse>

export const SponsoredBrandsCampaignResponse = t.intersection([
  t.strict({
    /**
     * The idenifier of the campaign.
     */
    campaignId: CampaignId,

    adGroupResponses: t.array(
      t.intersection([
        t.strict({
          /**
           * The identifier of the ad group.
           */
          adGroupId: t.number,
        }),
        ResponseStatus,
      ]),
    ),

    keywordResponses: t.array(
      t.intersection([
        t.strict({
          /**
           * The identifier of the keyword.
           */
          keywordId: t.number,
        }),
        ResponseStatus,
      ]),
    ),
  }),
  ResponseStatus,
])
export type SponsoredBrandsCampaignResponse = t.TypeOf<typeof SponsoredBrandsCampaignResponse>

export const ListCampaignsParams = t.intersection([
  ListPagination,
  t.partial({
    /**
     * Restricts results to campaigns with state within the specified comma-separated list. Valid states are enabled, paused, or archived.
     * Default behavior is to include enabled and paused. Rejected campaigns will show under “archived” enum.
     */
    stateFilter: CampaignStateType,

    /**
     * Restricts results to campaigns with exactly matching name.
     */
    name: CampaignName,

    /**
     * Restricts results to campaigns associated with the specified portfolio identifier.
     */
    portfolioIdFilter: PortfolioId,

    /**
     * Restricts results to campaigns with the specified identifier.
     */
    campaignIdFilter: t.array(CampaignId),
  }),
])
export type ListCampaignsParams = t.TypeOf<typeof ListCampaignsParams>
