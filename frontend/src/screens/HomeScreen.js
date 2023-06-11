import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
// Components
import Product from '../components/Product';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import '../css/HomeScreen.css'
import '../css/Style.css'
// Redux actions
import { listProducts } from '../redux/actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return <>
    <Header/>
        <Meta />
        <ProductCarousel/>
        
      <section id="section-id-1589360516917" className="sppb-section homescreen-mega">
        <div className="sppb-row-container">
          <div className="sppb-row">
            <div className="sppb-col-md-12" id="column-wrap-id-1589360516916">
              <div id="column-id-1589360516916" className="sppb-column">
                <div className="sppb-column-addons">
                  <div id="sppb-addon-wrapper-1589360516920" className="sppb-addon-wrapper">
                    <div id="sppb-addon-1589360516920" className="clearfix ">
                      <div className="sppb-addon sppb-addon-header sppb-text-center">
                        <h4 className="sppb-addon-title ">mega season sale up to 29% off</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        <section id="section-id-1589696218278" className="sppb-section">
        <div className="sppb-row-container">
          <div className="sppb-row">
            <div className="sppb-col-md-1" id="column-wrap-id-1589696218276">
              <div id="column-id-1589696218276" className="sppb-column">
                <div className="sppb-column-addons" />
              </div>
            </div>
            <div className="sppb-col-md-10" id="column-wrap-id-1589696218382">
              <div id="column-id-1589696218382" className="sppb-column">
                <div className="sppb-column-addons">
                  <div id="sppb-addon-wrapper-1589696218281" className="sppb-addon-wrapper">
                    <div id="sppb-addon-1589696218281" className="clearfix ">
                      <div className="sppb-addon-image-layouts">
                        <div className="sppb-addon-content">
                          <div className="sppb-addon-image-layout-wrap image-layout-preset-style-card">
                            <div className="sppb-row">
                              <div className="sppb-col-sm-6 sppb-order-md-1">
                                <div className="sppb-addon-image-layout-image image-fit"><img className="sppb-img-responsive image-fit" src="http://demo.joomlabuff.com/shoeland/images/joomlabuff/intro-red-shoe.png" alt="shoes" loading="lazy" /></div>
                              </div>
                              <div className="sppb-col-sm-6 sppb-order-md-2 sppb-order-sm-2 sppb-order-xs-2">
                                <div className="sppb-addon-image-layout-content sppb-text-alignment">
                                  <h3 className="sppb-image-layout-title">
                                    <div className="text-fill-black">Season Off 30% <br /> <strong>Running Shoes</strong></div>
                                  </h3>
                                  <div className="sppb-addon-image-layout-text">Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Ultricies integer quis auctor elit sed vulputate.</div><a href="#" id="btn-1589696218281" className="sppb-btn  sppb-btn-primary sppb-btn-rounded">Shop now</a></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="sppb-addon-wrapper-1589696218359" className="sppb-addon-wrapper">
                    <div id="sppb-addon-1589696218359" className="clearfix ">
                      <div className="sppb-addon-image-layouts">
                        <div className="sppb-addon-content">
                          <div className="sppb-addon-image-layout-wrap image-layout-preset-style-card">
                            <div className="sppb-row">
                              <div className="sppb-col-sm-6 sppb-order-md-2">
                                <div className="sppb-addon-image-layout-image image-fit"><img className="sppb-img-responsive image-fit" src="http://demo.joomlabuff.com/shoeland/images/joomlabuff/intro-blue-shoe.png" alt="shoes" loading="lazy" /></div>
                              </div>
                              <div className="sppb-col-sm-6 sppb-order-md-1 sppb-order-sm-2 sppb-order-xs-2">
                                <div className="sppb-addon-image-layout-content sppb-text-alignment">
                                  <h3 className="sppb-image-layout-title">
                                    <div className="text-fill-black">Best Seller <br /> <strong>Adidas Shoes</strong></div>
                                  </h3>
                                  <div className="sppb-addon-image-layout-text">Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Ultricies integer quis auctor elit sed vulputate.</div><a href="#" id="btn-1589696218359" className="sppb-btn  sppb-btn-primary sppb-btn-rounded">Shop now</a></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sppb-col-md-1" id="column-wrap-id-1589696218383">
              <div id="column-id-1589696218383" className="sppb-column">
                <div className="sppb-column-addons" />
              </div>
            </div>
          </div>
        </div>
      </section>
        <h1 className='homescreen-latest'>Latest Products</h1>
        {error ? <Message message={error} /> : (<Row>
            {/* Rendering the products in columns */}
            {products.map((product) => {
                return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            })}
        </Row>)}

        <section id="section-id-1589481377068" className="sppb-section homescreen-background">
          <div className="sppb-row-overlay" />
          <div className="sppb-row-container">
            <div className="sppb-row">
              <div className="sppb-col-md-6" id="column-wrap-id-1589481377066">
                <div id="column-id-1589481377066" className="sppb-column">
                  <div className="sppb-column-addons">
                    <div id="sppb-addon-wrapper-1589481377076" className="sppb-addon-wrapper">
                      <div id="sppb-addon-1589481377076" className="clearfix ">
                        <div className="sppb-addon sppb-addon-header text-fill-black sppb-text-left">
                          <h2 className="sppb-addon-title">Nike Flyknit<br /> Air Max</h2>
                        </div>
                      </div>
                    </div>
                    <div id="sppb-addon-wrapper-1589481377079" className="sppb-addon-wrapper">
                      <div id="sppb-addon-1589481377079" className="clearfix ">
                        <div className="sppb-addon sppb-addon-text-block sppb-text-left ">
                          <div className="sppb-addon-content">Free shipping, and no hassle returns. Only with Nike+. Running shoes for men &amp; women</div>
                        </div>
                      </div>
                    </div>
                    <div id="sppb-addon-wrapper-1589481377082" className="sppb-addon-wrapper">
                      <div id="sppb-addon-1589481377082" className="clearfix ">
                        <div className="sppb-text-left"><a href="#" id="btn-1589481377082" className="sppb-btn  sppb-btn-primary sppb-btn-square">Show now</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sppb-col-md-6" id="column-wrap-id-1589481377067">
                <div id="column-id-1589481377067" className="sppb-column">
                  <div className="sppb-column-addons">
                    <div id="sppb-addon-wrapper-1589782692430" className="sppb-addon-wrapper">
                      <div id="sppb-addon-1589782692430" className="clearfix ">
                        <div className="sppb-empty-space  clearfix" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      <h1 className='homescreen-latest'>TRENDING PRODUCTS</h1>
        {error ? <Message message={error} /> : (<Row>
            {/* Rendering the products in columns */}
            {products.map((product) => {
                return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            })}
        </Row>)}

        <section id="section-id-1589798193701" className="sppb-section homescreen-signup">
        <div className="sppb-row-container">
          <div className="sppb-row">
            <div className="sppb-col-md-12" id="column-wrap-id-1589798193726">
              <div id="column-id-1589798193726" className="sppb-column">
                <div className="sppb-column-addons">
                  <div id="sppb-addon-wrapper-1589798193712" className="sppb-addon-wrapper">
                    <div id="sppb-addon-1589798193712" className="clearfix " data-col-zindex={10}>
                      <div className="sppb-addon-overlayer" />
                      <div className="sppb-addon sppb-addon-optin-forms optintype-normal  sppb-text-left grid8-4">
                        <div className="sppb-optin-form-box sppb-row has-grid">
                          <div className="sppb-optin-form-info-wrap media-position-top sppb-col-sm-8">
                            <div className="sppb-optin-form-img-wrap  sppb-optin-form-icon" />
                            <div className="sppb-optin-form-details-wrap">
                              <h3 className="sppb-addon-title">SignUp Newsletter Today</h3>
                              <div className="sppb-optin-form-details">Signup Your email address to subscribe our newsletter to get latest post and news about our product and company</div>
                            </div>
                          </div>
                          <div className="sppb-optin-form-content sppb-col-sm-4">
                            <form className="sppb-optin-form form-inline submit-button-inside">
                              <div className="sppb-form-group email-wrap"><input type="email" name="email" className="sppb-form-control" placeholder="Email" required="required" aria-label="email" /></div><input type="hidden" name="platform" defaultValue="mailchimp" />
                              <input type="hidden" name="hidename" defaultValue={1} /><input type="hidden" name="pageid" defaultValue={1} /><input type="hidden" name="addonId" defaultValue={1589798193712} />
                              <div className="button-wrap sppb-text-right"><button type="submit" id="btn-1589798193712" className="sppb-btn sppb-btn-custom sppb-btn-sm sppb-btn-round sppb-btn-custom" aria-label><i className="fa" aria-hidden="true" /> <i className="fas fa-long-arrow-alt-right" aria-hidden="true" /></button></div>
                            </form>
                            <div style={{display: 'none', marginTop: '10px'}} className="sppb-optin-form-status" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
}

export default HomeScreen;